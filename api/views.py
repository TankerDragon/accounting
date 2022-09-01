
###
from asyncore import dispatcher
from django.shortcuts import render, HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.conf import settings
from django.db.models import Q
from core.serializers import UserSerializer, UserCreateSerializer
from .serializers import DriverSerializer, DispatcherSerializer, LogSerializer, CreateDriverSerializer, CreateDispatcherSerializer
from core.models import User
from .models import Driver, Log
from decimal import Decimal
import datetime

WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']


#funtions 
def get_week_start():
    now = datetime.datetime.now()
    now = now.replace(hour=0, minute=0, second=1)
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
def test(request, id):
    pass

# @api_view()
# def main(request):
#     print([user[0] for user in  User.objects.all().values_list('username')])
#     return Response({"greet": "Hola!"})

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def main(request):
    ###
    request.user.is_superuser = True
    ###

    if request.method == "GET":
        if request.user.is_superuser:
            queryset = Driver.objects.all().order_by('first_name')
            l_total = 0
            d_total = 0
            r_total = 0
            s_total = 0
            for query in queryset:
                query.total_budget = query.d_budget + query.l_budget + query.r_budget + query.s_budget
                l_total += query.l_budget
                d_total += query.d_budget
                r_total += query.r_budget
                s_total += query.s_budget

            driver_serializer = DriverSerializer(queryset, many=True)

            response_data = {
                'drivers': driver_serializer.data,
                'budget': {
                    'driver': d_total,
                    'lane': l_total,
                    'recovery': r_total,
                    'dirilis': s_total,
                    'total':l_total + d_total + r_total + s_total
                }
            }

            return Response(response_data, status=status.HTTP_200_OK)
        else:
            queryset = Driver.objects.filter(dispatcher=request.user).order_by('first_name')
            driver_serializer = DriverSerializer(data=queryset, many=True)
            response_data = {
                'divers': driver_serializer.data
            }
            return Response(response_data, status=status.HTTP_200_OK)

            
    if request.method == "POST":
        driverID = request.data["driver_id"]
        if not driverID:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        driver = Driver.objects.get(pk=request.data['driver_id'])
        # in_group = Group.objects.filter(staff = request.user)
        # drivers_list = list(map(lambda l: l.driver_id, in_group))
        # print(drivers_list)

        # data = {
        #     'driver_id': 0,
        #     'original_rate': 0,
        #     'current_rate': 0,
        #     'budget_type': '',
        #     'total_miles': 0,
        #     'bol_number': '',
        #     'pcs_number': '',
        #     'note': ''
        # }

        if request.user.is_superuser or driver.dispatcher == request.user:
            data = request.data
            # adding changed amount to the data
            try:
                change = Decimal(request.data['original_rate']) - Decimal(request.data['current_rate'])
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            data['change'] = change

            b_type = request.data['budget_type']
            data['user_id'] = request.user.id
            
            print('request.user.id', request.user.id)

            log = LogSerializer(data=data)
            if log.is_valid():
                saved_log = log.save()
                saved_log.date = datetime.datetime.now()
                saved_log.save()
                #
                if b_type == 'D':
                    driver.d_budget += change
                elif b_type == 'L':
                    driver.l_budget += change
                elif b_type == 'R':
                    driver.r_budget += change
                elif b_type == 'S':
                    driver.s_budget += change
                driver.save()
                return Response(status=status.HTTP_200_OK)
            return Response(log.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def new_driver(request):
    ###
    request.user.is_superuser = True
    ###
    if request.user.is_superuser:
        if request.method == 'GET':
            dispatchers = User.objects.filter(is_superuser = False).values('id', 'username')
            dispatchers_list = [{'id': dispatcher["id"], 'username': dispatcher["username"]} for dispatcher in dispatchers]

            return Response(dispatchers_list, status=status.HTTP_200_OK)

        if request.method == 'POST':
            driver_serializer = CreateDriverSerializer(data=request.data)
            if driver_serializer.is_valid():
                driver_serializer.save()
                return Response({'success': 'driver has been succesfully added'}, status=status.HTTP_201_CREATED)
            return Response(driver_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    else:
        return Response({'detail': 'you have no access to use this page'}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getDispatchers(request):
    ###
    request.user.is_superuser = True
    ###
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
    ###
    request.user.is_superuser = True
    ###
    if request.user.is_superuser:
        if request.method == 'POST':
            driver_serializer = CreateDispatcherSerializer(data=request.data)
            if driver_serializer.is_valid():
                driver_serializer.save()
                return Response({'success': 'dispatcher has been succesfully added'}, status=status.HTTP_201_CREATED)
            return Response(driver_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    else:
        return Response({'detail': 'you have no access to use this page'}, status=status.HTTP_403_FORBIDDEN)











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

