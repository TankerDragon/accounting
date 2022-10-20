
###
from lib2to3.pgen2 import driver
from django.shortcuts import render, HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.conf import settings
from django.db.models import Q
from core.serializers import UserSerializer, UserCreateSerializer
from .serializers import DriverSerializer, DriverNameSerializer, DispatcherSerializer, DispatcherNameSerializer, LogSerializer, CreateDriverSerializer, CreateDispatcherSerializer, LogDecimalFielsSerializer, UpdateDispatcherSerializer, DriversBoardSerializer
from core.models import User
from .models import Driver, Log, LogEdit
from decimal import Decimal
# from .tasks import notify_customers
import datetime


# constants

WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']


#funtions
def get_week_start():
    now = datetime.datetime.now()
    now = now.replace(hour=0, minute=0, second=0)
    days = WEEKDAYS.index(now.strftime("%A")) + 1  # starting date from Saturday
    week_start = now - datetime.timedelta(days=days)
    return week_start

def get_name(id, arr):
    for a in arr:
        if id == a['id']:
            return a['first_name'] + ' ' + a['last_name']
    return '*name not found'

# Create your views here.
@api_view(['GET', 'PATCH'])
@permission_classes([AllowAny])
def test(request):
    # notify_customers.delay('hello')
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': 'created!'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def main(request):
    if request.method == "GET":
        if request.user.is_superuser:
            drivers_query = Driver.objects.all().order_by('first_name')
        else:
            drivers_query = Driver.objects.filter(dispatcher=request.user).order_by('first_name')
        drivers_serializer = DriverSerializer(drivers_query, many=True)
        return Response(drivers_serializer.data, status=status.HTTP_200_OK)
            
    if request.method == "POST":
        data = request.data
        budget_type = request.data['budget_type']
        check_decimal_places = LogDecimalFielsSerializer(data=data)
        if check_decimal_places.is_valid():
            # adding data
            data['change'] = check_decimal_places.validated_data['original_rate'] - check_decimal_places.validated_data['current_rate']
            data['user'] = request.user.id
            data['date'] = datetime.date.today()
            data['time'] = datetime.datetime.now().strftime("%H:%M:%S")
            
            # check if data is valid
            log_serializer = LogSerializer(data=data)
            if log_serializer.is_valid():
                # check if pcs_number is not used before
                numOfPCSNumbers = Log.objects.filter(pcs_number=data['pcs_number'], is_edited=False).count()
                if numOfPCSNumbers == 0:
                    driver = Driver.objects.get(pk=data['driver'])
                    # check if user is superuser or user is driver's dispatcher
                    if request.user.is_superuser or driver.dispatcher == request.user:
                        log_serializer.save()
                        if budget_type == 'D':
                            driver.d_budget += data['change']
                        elif budget_type == 'L':
                            driver.l_budget += data['change']
                        elif budget_type == 'R':
                            driver.r_budget += data['change']
                        driver.save()
                        return Response(status=status.HTTP_200_OK)
                    return Response(status=status.HTTP_400_BAD_REQUEST)
                return Response({'pcs_number': ['this PCS number is used before']}, status=status.HTTP_400_BAD_REQUEST)
            return Response(log_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(check_decimal_places.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def drivers(request):
    if request.method == 'GET':
        # dispatchers = User.objects.filter(is_superuser = False).values('id', 'username')
        # dispatchers_list = [{'id': dispatcher["id"], 'username': dispatcher["username"]} for dispatcher in dispatchers]

        # return Response(dispatchers_list, status=status.HTTP_200_OK)
        drivers_query = Driver.objects.all().order_by('first_name')
        drivers_serializer = DriverSerializer(drivers_query, many=True)
        return Response(drivers_serializer.data, status=status.HTTP_200_OK)

    if request.method == 'POST':
        driver_serializer = CreateDriverSerializer(data=request.data)
        if driver_serializer.is_valid():
            driver_serializer.save()
            return Response({'success': 'driver has been succesfully added'}, status=status.HTTP_201_CREATED)
        return Response(driver_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    # else:
    #     return Response({'detail': 'you have no access to use this page'}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def edit_driver(request, id):
    if request.user.is_superuser:

        if request.method == "GET":
            driver = Driver.objects.get(pk=id)
            driver_serializer = CreateDriverSerializer(driver)
            return Response(driver_serializer.data, status=status.HTTP_200_OK)

        if request.method == 'PATCH':
            driver = Driver.objects.get(pk=id)
            driver_serializer = CreateDriverSerializer(instance=driver, data=request.data)
            if driver_serializer.is_valid():
                driver_serializer.save()
                return Response({'success': 'driver has been succesfully updated'}, status=status.HTTP_200_OK)
            return Response(driver_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({'detail': 'you have no access to use this page'}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getDispatchers(request):
    
    if request.user.is_superuser:
        if request.method == 'GET':
            dispatchers = User.objects.filter(is_superuser = False)
            dispatchers_serializer = DispatcherSerializer(dispatchers, many=True)            
            return Response(dispatchers_serializer.data, status=status.HTTP_200_OK)
        
    else:
        return Response({'detail': 'you have no access to use this page'}, status=status.HTTP_403_FORBIDDEN)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def new_dispatcher(request):
    
    if request.user.is_superuser:
        if request.method == 'POST':
            driver_serializer = CreateDispatcherSerializer(data=request.data)
            if driver_serializer.is_valid():
                driver_serializer.save()
                return Response({'success': 'dispatcher has been succesfully added'}, status=status.HTTP_201_CREATED)
            return Response(driver_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    else:
        return Response({'detail': 'you have no access to use this page'}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'PATCH'])
@permission_classes([AllowAny])
def edit_dispatcher(request, id):
    if True:

        if request.method == "GET":
            dispatcher = User.objects.get(pk=id)
            dispatcher_serializer = UpdateDispatcherSerializer(dispatcher)
            return Response(dispatcher_serializer.data, status=status.HTTP_200_OK)

        if request.method == 'PATCH':
            dispatcher = User.objects.get(pk=id)
            dispatcher_serializer = UpdateDispatcherSerializer(instance=dispatcher, data=request.data)
            if dispatcher_serializer.is_valid():
                dispatcher_serializer.save()
                return Response({'success': 'dispatcher has been succesfully updated'}, status=status.HTTP_200_OK)
            return Response(dispatcher_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({'detail': 'you have no access to use this page'}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
@permission_classes([AllowAny])
def archive(request):
    if request.method == 'GET':
        #preparing driver names
        driver_names = Driver.objects.all().values('id', 'first_name', 'last_name')
        driver_names_serializer = DriverNameSerializer(driver_names, many=True)

        #preparing dispatcher names
        dispatcher_names = User.objects.filter(role='DIS').values('id', 'first_name', 'last_name')
        dispatcher_names_serializer = DispatcherNameSerializer(dispatcher_names, many=True)

        queryset = Log.objects.all().order_by('-date')
        log_serializer = LogSerializer(queryset, many=True)

        return Response({"logs": log_serializer.data, "drivers": driver_names_serializer.data, "dispatchers": dispatcher_names_serializer.data}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def driver_archive(request, id):
    log_edits = LogEdit.objects.all().values('edited_log')
    logEdits_list = list(map(lambda l: l['edited_log'], log_edits))
    #
    # driver = Driver.objects.get(pk = id)

    if request.user.is_superuser:
        queryset = Log.objects.all().filter(driver_id = id, is_edited = False).order_by('-date')
    else:
        # in_group = Group.objects.filter(staff = request.user)
        # drivers_list = list(map(lambda l: l.driver_id, in_group))
        queryset = Log.objects.filter(driver_id = id, is_edited = False).order_by('-date') #, user=request.user

    log_serializer = LogSerializer(queryset, many=True)

    for query in log_serializer.data:
        query["edited_link"] = False
        if query["id"] in logEdits_list:
            query["edited_link"] = True

    return Response(log_serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def edit_log(request, id):
    log = Log.objects.get(pk=id)

    if request.method == 'GET':
        log_serializer = LogSerializer(log)
        return Response(log_serializer.data, status=status.HTTP_200_OK)

    if request.method == 'PATCH':
        data = request.data
        budget_type = request.data['budget_type']
        check_decimal_places = LogDecimalFielsSerializer(data=data)
        if check_decimal_places.is_valid():
            # adding data
            data['change'] = check_decimal_places.validated_data['original_rate'] - check_decimal_places.validated_data['current_rate']
            data['user'] = request.user.id
            data['date'] = log.date
            # check if data is valid
            log_serializer = LogSerializer(data=data)
            if log_serializer.is_valid():
                # check if pcs_number is not used before
                numOfPCSNumbers = Log.objects.filter(pcs_number=data['pcs_number'], is_edited=False).count()
                if numOfPCSNumbers == 0 or log.pcs_number == data['pcs_number']:
                    driver = Driver.objects.get(pk=data['driver'])
                    # check if user is superuser or user is driver's dispatcher
                    if request.user.is_superuser or driver.dispatcher == request.user:
                        new_log = log_serializer.save()
                        if budget_type == 'D':
                            driver.d_budget += data['change']
                        elif budget_type == 'L':
                            driver.l_budget += data['change']
                        elif budget_type == 'R':
                            driver.r_budget += data['change']
                        # driver.save()
                        #updating old log
                        log.is_edited = True
                        log.save()
                        #getting back changed budget from driver
                        if log.budget_type == 'D':
                            driver.d_budget -= log.change
                        elif log.budget_type == 'L':
                            driver.l_budget -= log.change
                        elif log.budget_type == 'R':
                            driver.r_budget -= log.change
                        elif log.budget_type == 'S':
                            driver.s_budget -= log.change
                        driver.save()
                        #saving log edition
                        log_edit = LogEdit.objects.create(original_log = log, edited_log = new_log)
                        log_edit.save()
                        return Response(status=status.HTTP_200_OK)
                    return Response(status=status.HTTP_400_BAD_REQUEST)
                return Response({'pcs_number': ['this PCS number is used before']}, status=status.HTTP_400_BAD_REQUEST)
            return Response(log_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(check_decimal_places.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def archive_edits(request, id):
    #selecting logs only related to given ID
    editGroup = LogEdit.objects.all().order_by('-date') #values('original_log', 'edited_log')
    nextPickID = id
    pickedLogs = []
    pickedLogs.append(id)
    for g in editGroup:
        if g.edited_log_id == nextPickID:
            nextPickID = g.original_log_id
            pickedLogs.append(nextPickID)

    editedLogs = Log.objects.filter(pk__in = pickedLogs)

    log_serializer = LogSerializer(editedLogs, many=True)
    # reverding data
    data = log_serializer.data[::-1]
    return Response(data, status=status.HTTP_200_OK)
    # #adding drivers name
    # driver_ids = list(map(lambda q: q.driver_id, editedLogs))
    # driver_names = Driver.objects.filter(pk__in = driver_ids).values('id', 'first_name', 'last_name')
    # for e_query in editedLogs:
    #     e_query.name = get_name(e_query.driver_id, driver_names)


@api_view(['GET'])
@permission_classes([AllowAny])
def drivers_board(request, week_before):
    request.user.is_superuser = True
    # calculating requested week start and week end
    week_start = get_week_start() - datetime.timedelta(days=(7 * week_before))
    week_end = week_start + datetime.timedelta(days=7)
    # till_today = datetime.datetime.now() + datetime.timedelta(days=1)

    dispatchers = User.objects.filter(is_superuser=False).values("username")
    dispatchers_list = [dispatcher["username"] for dispatcher in dispatchers]
    logs = Log.objects.filter(date__gte = week_start, date__lte = week_end, is_edited=False)

    if request.user.is_superuser:
        drivers = Driver.objects.all().values("id", "first_name", "last_name", "dispatcher", "gross_target")
    else:
        drivers = Driver.objects.filter(dispatcher=request.user).values("id", "first_name", "last_name", "dispatcher", "gross_target")

    drivers = list(drivers)
    # drivers_serializer = DriversBoardSerializer(drivers, many=True)
    for d in drivers:
        print(d.id)


    # for driver in drivers:
    #     driver.disp =''
    #     for d in dispatchers_list:
    #         if driver.dispatcher_id == d[0]:
    #             driver.disp = d[1]

    #     driver_logs = list(filter(lambda l: l.driver_id == driver.id, logs))
    #     total_miles = 0
    #     actual_gross = 0
    #     for l in driver_logs:
    #         total_miles += l.total_miles
    #         actual_gross += l.current_rate

    #     driver.loads = len(driver_logs)
    #     driver.total_miles = total_miles
    #     driver.actual_gross = actual_gross
    #     if total_miles == 0:
    #         driver.rate = 0
    #     else:    
    #         driver.rate = round((actual_gross / total_miles)*100) / 100

    #     if driver.gross_target == 0:
    #         driver.percentage = 0
    #     else:    
    #         driver.percentage = round((actual_gross / driver.gross_target) * 10000) / 100

    # drivers = sorted(drivers, key=lambda d: d.percentage, reverse=True)

    # context = {
    #     'drivers': drivers, 
    #     'is_superuser': request.user.is_superuser, 
    #     'user': request.user,
    #     'category' : 'drivers-gross',
    #     "week_start": week_start.date,
    #     "week_end": week_end.date
    #     }
    # return render(request, "drivers-board.html", context)
    return Response(drivers, status=status.HTTP_200_OK)












# @api_view(['GET'])
# # @permission_classes([IsAuthenticated])
# def getDrivers(request):
#     if request.method == 'GET':
#         drivers = Driver.objects.all()
#         user_IDs = [driver.user_id for driver in drivers]
#         users = User.objects.filter(id__in = user_IDs)
#         vehicles = Vehicle.objects.filter(~Q(driver_id=None)).values('id', 'unit_number', 'driver_id')
#         driver_serializer = DriverSerializer(drivers, many=True)
#         user_serializer = UserSerializer(users, many=True)

#         #adding vehicle unit number to driver
#         for driver in driver_serializer.data:
#             for vehicle in vehicles:
#                 if driver["id"] == vehicle["driver_id"]:
#                     driver["vehicle_unit_number"] = vehicle["unit_number"]

#         #adding driver fields to user
#         for user in user_serializer.data:
#             for driver in driver_serializer.data:
#                 if driver["user_id"] == user["id"]:
#                     user["profile"] = driver

#         # adding driver's co driver name
#         for user in user_serializer.data:
#             for co_user in user_serializer.data:
#                 if user["profile"]["co_driver"] == co_user["profile"]["id"]:
#                     user["profile"]["co_driver_name"] = co_user["first_name"] + ' ' + co_user["last_name"]

#         return Response(user_serializer.data)
    

# @api_view(['GET','POST'])
# def newDriver(request):
#     if request.method == "GET":
#         # preparing co drivers' names and IDs
#         drivers = Driver.objects.filter(Q(co_driver_id=None)).values('id', 'user_id')
#         user_IDs = [driver["user_id"] for driver in drivers]
#         users = User.objects.filter(id__in = user_IDs).values('id', 'first_name', 'last_name')

#         # adding names to drivers
#         for driver in drivers:
#             for user in users:
#                 if driver["user_id"] == user["id"]:
#                     driver["full_name"] = user["first_name"] + ' ' + user["last_name"]

#         # preparing vehicles' unit numbers and IDs
#         vehicles = Vehicle.objects.filter(Q(driver_id=None)).values('id', 'unit_number')
#         return Response({"drivers": drivers, "vehicles": vehicles})


#     if request.method == 'POST':
#         # print(request.data)
#         user = UserCreateSerializer(data=request.data)
#         profile = DriverSerializer(data=request.data.get("profile"))
#         valid_user = user.is_valid()
#         valid_profile = profile.is_valid()
#         #check the assigned vehicle
#         assigned_vehicle_id = request.data.get("profile").get("vehicle")
#         assigned_vehicle = None
#         if assigned_vehicle_id:
#             assigned_vehicle = Vehicle.objects.get(pk = assigned_vehicle_id)
#             # !!! if assigned_vehicle is not in database there will be error
        
#         #check the assigned co driver
#         assigned_co_driver_id = request.data.get("profile").get("co_driver")
#         assigned_co_driver = None
#         if assigned_co_driver_id:
#             assigned_co_driver = Driver.objects.get(pk = assigned_co_driver_id)
#             # !!! if assigned_co_driver is not in database there will be error
        
#         if valid_user and valid_profile:
#             if (not assigned_vehicle or assigned_vehicle.driver_id == None) and (not assigned_co_driver or assigned_co_driver.co_driver_id == None):
#                 saved_user = user.save()
#                 saved_profile = profile.save()
#                 # clone user and profile together
#                 saved_profile.user_id = saved_user.id
#                 saved_profile.save()
#                 # saving vehicle if there was assigned
#                 if assigned_vehicle_id:
#                     assigned_vehicle.driver_id = saved_profile.id
#                     assigned_vehicle.save()
#                 # saving co driver if there was assigned
#                 if assigned_co_driver_id:
#                     assigned_co_driver.co_driver_id = saved_profile.id
#                     assigned_co_driver.save()
                
#                 return Response({"success": "driver has been added successfully"}, status=status.HTTP_200_OK)
#             # else: # there we can do something if there was requested to assign invalid vehicle or co driver
#         return Response({"user": user.errors, "profile": profile.errors}, status=status.HTTP_400_BAD_REQUEST)
    

# @api_view(['GET', 'PATCH'])
# def updateDriver(request, id):
#     if request.method == 'GET':
#         driver = Driver.objects.get(pk=id)
#         user = User.objects.get(pk=driver.user_id)
#         try:
#             vehicle = Vehicle.objects.get(driver_id = driver.id)
#         except:
#             vehicle = None
#         driver_serializer = DriverSerializer(driver)
#         user_serializer = UserSerializer(user)

#         driver_data = driver_serializer.data
#         # adding vehicle unit number to driver
#         if vehicle:
#             driver_data["vehicle_unit_number"] = vehicle.unit_number
#             driver_data["vehicle"] = vehicle.id
#         else:
#             driver_data["vehicle_unit_number"] = None
#             driver_data["vehicle"] = None

#         #adding driver fields to user
#         user_data = user_serializer.data
#         user_data["profile"] = driver_data

#         # adding driver's co driver name if there is
#         if user_data["profile"]["co_driver"]:
#             co_driver = Driver.objects.get(pk=user_data["profile"]["co_driver"])
#             co_user = User.objects.get(pk=co_driver.user_id)
#             user_data["profile"]["co_driver_name"] = co_user.first_name + ' ' + co_user.last_name
#         else:
#             user_data["profile"]["co_driver_name"] = None

#         return Response(user_data)
    
#     if request.method == 'PATCH':
#         driver = Driver.objects.get(pk=id)
#         user = User.objects.get(pk=driver.user_id)
#         updated_user_serializer = UserSerializer(instance=user, data=request.data)
#         updated_driver_serializer = UpdateDriverSerializer(instance=driver, data=request.data.get("profile"))
#         valid_user = updated_user_serializer.is_valid()
#         valid_driver = updated_driver_serializer.is_valid()

#         #check the assigned vehicle
#         assigned_vehicle_id = request.data.get("profile").get("vehicle")
#         assigned_vehicle = None
#         if assigned_vehicle_id:
#             assigned_vehicle = Vehicle.objects.get(pk = assigned_vehicle_id)
#             # !!! if assigned_vehicle is not in database there will be error
        
#         #check the assigned co driver
#         assigned_co_driver_id = request.data.get("profile").get("co_driver")
#         assigned_co_driver = None
#         if assigned_co_driver_id:
#             assigned_co_driver = Driver.objects.get(pk = assigned_co_driver_id)
#             # !!! if assigned_co_driver is not in database there will be error
        
#         if valid_user and valid_driver:
#             if (not assigned_vehicle or assigned_vehicle.driver_id == None or assigned_vehicle.driver_id == driver.id) and (not assigned_co_driver or assigned_co_driver.co_driver_id == None or assigned_co_driver.co_driver_id == driver.id):
#                 saved_user = updated_user_serializer.save()
#                 saved_driver = updated_driver_serializer.save()
#                 # # clone user and profile together
#                 # saved_profile.user_id = saved_user.id
#                 # saved_profile.save()
#                 # saving vehicle if there was assigned and not already assigned
#                 if assigned_vehicle_id and not assigned_vehicle.driver_id == driver.id:
#                     assigned_vehicle.driver_id = saved_driver.id
#                     assigned_vehicle.save()
#                 # saving co driver if there was assigned and not already assigned
#                 if assigned_co_driver_id and not assigned_co_driver.co_driver_id == driver.id:
#                     assigned_co_driver.co_driver_id = saved_driver.id
#                     assigned_co_driver.save()
                
#                 return Response({"success": "driver has been added successfully"}, status=status.HTTP_200_OK)
#             # else: # there we can do something if there was requested to assign invalid vehicle or co driver
#         return Response({"user": updated_user_serializer.errors, "profile": updated_driver_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# # @permission_classes([IsAuthenticated])
# def getVehicles(request):
#     if request.method == 'GET':
#         vehicles = Vehicle.objects.all()
#         driver_IDs = [vehicle.driver_id for vehicle in vehicles]
#         drivers = Driver.objects.filter(id__in = driver_IDs).values('id', 'user_id')
#         user_IDs = [driver["user_id"] for driver in drivers]
#         users = User.objects.filter(id__in = user_IDs).values('id', 'first_name', 'last_name')

#         vehicle_serializer = VehicleSerializer(vehicles, many=True)
        
#         # cloning users to drivers
#         for user in users:
#             for driver in drivers:
#                 if driver["user_id"] == user["id"]:
#                     driver["full_name"] = user["first_name"] + " " + user["last_name"]
        
#         # adding names into data
#         for vehicle in vehicle_serializer.data:
#             for driver in drivers:
#                 if driver["id"] == vehicle["driver_id"]:
#                     vehicle["full_name"] = driver["full_name"]
#         return Response(vehicle_serializer.data, status=status.HTTP_200_OK)


    

# @api_view(['POST'])
# def newVehicle(request):
#     if request.method == 'POST':
#         # print(request.data)
#         vehicle = VehicleSerializer(data=request.data)

#         if vehicle.is_valid():
#             vehicle.save()
#             return Response({"success": "vehicle has been added successfully"}, status=status.HTTP_200_OK)
#         return Response(vehicle.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET', 'PATCH'])
# def updateVehicle(request, id):
#     if request.method == 'GET':
#         vehicle = Vehicle.objects.get(pk=id)
#         vehicle_serializer = VehicleSerializer(vehicle)
#         return Response(vehicle_serializer.data, status=status.HTTP_200_OK)

#     if request.method == 'PATCH':
#         vehicle = Vehicle.objects.get(pk=id)
#         updated_vehicle_serializer = UpdateVehicleSerializer(instance=vehicle, data=request.data)

#         if updated_vehicle_serializer.is_valid():
#             updated_vehicle_serializer.save()
#             return Response({"success": "vehicle has been successfully updated"}, status=status.HTTP_200_OK)
#         return Response(updated_vehicle_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET', 'POST'])
# def logs(request, id, date):
#     if request.method == 'GET':
#         logs = Log.objects.filter(driver_id = id, date=date)
#         log_serializer = LogSerializer(logs, many=True)
#         return Response(log_serializer.data)
#     if request.method == 'POST':
#         new_log = LogSerializer(data=request.data)
#         if new_log.is_valid():
#             new_log.save()
#             return Response({"success": "log has added successfully"}, status=status.HTTP_200_OK)
#         return Response(new_log.errors, status=status.HTTP_400_BAD_REQUEST)

