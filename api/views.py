import time
from datetime import datetime
from django.shortcuts import render, HttpResponse
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from core.serializers import UserSerializer, UserCreateSerializer, UserListSerializer, AppUserSerializer
from core.models import User, Appuser
from .serializers import DriverSerializer, DriverListSerializer, DriverEditSerializer, DriverActivitySerializer, CarrierSerializer, CarrierListSerializer, CarrierEditSerializer, LoadSerializer, LoadEditSerializer
from .models import Driver, EditDriver , Carrier, EditCarrier, Load, EditLoad
from .functions import check_permission, get_week_start, generate_action
from .tasks import notify_customers

# Create your views here.
@api_view(['GET', 'PATCH'])
@permission_classes([AllowAny])
def test(request):
    notify_customers.delay('hello')
    return Response(status=status.HTTP_200_OK)


@api_view(['GET', 'POST', 'PUT'])
@permission_classes([AllowAny])
def drivers(request):
    time.sleep(2.5)
    if request.method == 'GET':
        if check_permission(request.user, 'view', 'driver'):
            if request.GET.get('list'):
                query = Driver.objects.values('id', 'first_name', 'last_name').all()
                serializer = DriverListSerializer(query, many=True)
            elif request.GET.get('updates'):
                query = EditDriver.objects.filter(driver_id=request.GET.get('updates'))
                serializer = DriverEditSerializer(query, many=True)
            elif request.GET.get('activity'):
                query = EditDriver.objects.values('status', 'edit_time').filter(driver_id=request.GET.get('id'), edit_time__gte=request.GET.get('from'), edit_time__lte=request.GET.get('to'))
                serializer = DriverActivitySerializer(query, many=True)
                # 'from': datetime.strptime(request.GET.get('from'), '%Y-%M-%d'),
                # 'to': datetime.strptime(request.GET.get('to'), '%Y-%M-%d'),
                return Response(serializer.data, status=status.HTTP_200_OK)
            elif request.GET.get('id'):
                query = Driver.objects.get(pk=request.GET.get('id'))
                serializer = DriverSerializer(query)
                if query.current_load:
                    load = Load.objects.get(pk=query.current_load_id)
                    load_serializer = LoadSerializer(load)
                    carrier_name = Carrier.objects.values('name').get(pk=load.carrier_id)['name']
                    return Response({**serializer.data, 'load': load_serializer.data, 'carrier_name': carrier_name}, status=status.HTTP_200_OK)
            else:
                query = Driver.objects.all()
                serializer = DriverSerializer(query, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'detail': 'you have no access to view drivers'}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'POST':
        if check_permission(request.user, 'create', 'driver'):
            driver_serializer = DriverSerializer(data=request.data)
            if driver_serializer.is_valid():
                new_driver = driver_serializer.save()
                generate_action(request.user.id, 'cre', new_driver.id, 'dri')
                return Response({'success': 'driver has been succesfully created'}, status=status.HTTP_201_CREATED)
            return Response(driver_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'you have no access to create a driver'}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'PUT':
        if check_permission(request.user, 'update', 'driver'):
            request.data['request_user_id'] = request.user.id
            driver = Driver.objects.get(pk=request.data["id"])
            driver_serializer = DriverSerializer(instance=driver, data=request.data)
            if driver_serializer.is_valid():
                driver_serializer.save()
                return Response({'success': 'driver has been succesfully updated'}, status=status.HTTP_200_OK)
            return Response(driver_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'you have no access to update a driver'}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'POST', 'PUT'])
@permission_classes([AllowAny])
def users(request):
    time.sleep(0.5)
    if request.method == 'GET':
        if check_permission(request.user, 'view', 'user'):
            if request.GET.get('id', None):
                user = User.objects.get(pk=request.GET.get('id'))
                serializer = UserSerializer(user)
            elif request.GET.get('list'):
                if request.GET.get('filter'):
                    users = User.objects.values('id', 'username').filter(role=request.GET.get('filter'))
                else:
                    users = User.objects.values('id', 'username').all()
                serializer = UserListSerializer(users, many=True)
            else:
                users = User.objects.all()
                serializer = UserSerializer(users, many=True)            
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'detail': 'you have no access to view users'}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'POST':
        if check_permission(request.user, 'create', 'user') and not request.data['role'] == 'OWN':
            user_serializer = UserCreateSerializer(data=request.data)
            appuser_serializer = AppUserSerializer(data=request.data)
            valid_user = user_serializer.is_valid()
            valid_appuser = appuser_serializer.is_valid()
            if valid_user and valid_appuser:
                new_user = user_serializer.save()
                new_appuser = appuser_serializer.save()
                # clone two models 
                new_appuser.user = new_user
                new_appuser.save()
                generate_action(request.user.id, 'cre', new_user.id, 'use')
                return Response({'success': 'user has been succesfully created'}, status=status.HTTP_201_CREATED)
            print('****************************')
            print(user_serializer.errors, appuser_serializer.errors)
            return Response({**user_serializer.errors, **appuser_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'you have no access to create user'}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'PUT':
        if check_permission(request.user, 'update', 'user') and not request.data['role'] == 'OWN':
            user = User.objects.get(pk=request.data["id"])
            appuser = Appuser.objects.get(user_id=user.id)
            if not request.user == user:
                appuser_serializer = AppUserSerializer(instance=appuser, data=request.data)
                user_serializer = UserSerializer(instance=user, data=request.data)
                valid_appuser = appuser_serializer.is_valid()
                valid_user = user_serializer.is_valid()
                if valid_appuser and valid_user:
                    appuser_serializer.save()
                    updated_user = user_serializer.save()
                    generate_action(request.user.id, 'upd', updated_user.id, 'use')
                    return Response({'success': 'user has been succesfully updated'}, status=status.HTTP_200_OK)
                return Response(user_serializer.errors | appuser_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({'detail': 'you cannot update yourself'}, status=status.HTTP_403_FORBIDDEN)
        return Response({'detail': 'you have no access to update users'}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'POST', 'PUT'])
@permission_classes([AllowAny])
def carriers(request):
    time.sleep(0.5)
    if request.method == 'GET':
        if check_permission(request.user, 'view', 'carrier'):
            if request.GET.get('list'):
                query = Carrier.objects.values('id', 'name').all()
                serializer = CarrierListSerializer(query, many=True)
            elif request.GET.get('updates'):
                query = EditCarrier.objects.filter(carrier_id=request.GET.get('updates'))
                serializer = CarrierEditSerializer(query, many=True)
            else:
                query = Carrier.objects.all()
                serializer = CarrierSerializer(query, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'detail': 'you have no access to view carriers'}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'POST':
        if check_permission(request.user, 'create', 'carrier'):
            serializer = CarrierSerializer(data=request.data)
            if serializer.is_valid():
                new_carrier = serializer.save()
                generate_action(request.user.id, 'cre', new_carrier.id, 'car')
                return Response({'success': 'carrier has been succesfully created'}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'you have no access to create a carrier'}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'PUT':
        if check_permission(request.user, 'update', 'carrier'):
            request.data['request_user_id'] = request.user.id
            carrier = Carrier.objects.get(pk=request.data["id"])
            serializer = CarrierSerializer(instance=carrier, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'success': 'carrier has been succesfully updated'}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'you have no access to update a carrier'}, status=status.HTTP_403_FORBIDDEN)
    

@api_view(['GET', 'POST', 'PUT'])
@permission_classes([IsAuthenticated])
def gross(request):
    time.sleep(0.5)
    if request.method == 'GET':
        if request.GET.get('updates'):
            query = EditLoad.objects.filter(load_id=request.GET.get('updates'))
            serializer = LoadEditSerializer(query, many=True)
        elif request.GET.get('id'):
            query = Load.objects.get(pk=request.GET.get('id'))
            serializer = LoadSerializer(query)
        elif request.GET.get('pagination'):
            paginator = PageNumberPagination()
            paginator.page_size = 18
            load_objects = Load.objects.all().order_by('-time')
            result_page = paginator.paginate_queryset(load_objects, request)
            serializer = LoadSerializer(result_page, many=True)
            return paginator.get_paginated_response(serializer.data)
        else:
            query = Load.objects.all().order_by('-time')
            serializer = LoadSerializer(query, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == "POST":
        data = request.data
        data['user'] = request.user.id
        log_serializer = LoadSerializer(data=data)
        if log_serializer.is_valid():
            new_log = log_serializer.save()
            driver = Driver.objects.get(pk=new_log.driver_id)
            driver.current_load = new_log
            driver.save()
            generate_action(request.user.id, 'cre', new_log.id, 'gro')
            return Response({'success': 'gross has been succesfully added'}, status=status.HTTP_200_OK)
        return Response(log_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'PUT':
        request.data['request_user_id'] = request.user.id
        data = request.data
        log = Load.objects.get(pk=data["id"])
        log_serializer = LoadSerializer(instance=log, data=data)
        if log_serializer.is_valid():
            log_serializer.save()
            return Response({'success': 'the gross has been succesfully updated'}, status=status.HTTP_200_OK)
        return Response(log_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def drivers_board(request):
    weeks_before = request.GET.get('weeks_before')
    # calculating requested week start and week end
    week_start = get_week_start() - datetime.timedelta(days=(7 * weeks_before))
    week_end = week_start + datetime.timedelta(days=7)

    dispatchers = User.objects.filter(role="DIS").values("username")
    dispatchers_list = [dispatcher["username"] for dispatcher in dispatchers]
    logs = Log.objects.filter(date__gte = week_start, date__lte = week_end)
















@api_view(['GET'])
@permission_classes([IsAuthenticated])
def driver_archive(request, id):
    time.sleep(0.5)
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

    log_serializer = LoadSerializer(queryset, many=True)

    for query in log_serializer.data:
        query["edited_link"] = False
        if query["id"] in logEdits_list:
            query["edited_link"] = True

    return Response(log_serializer.data, status=status.HTTP_200_OK)
   

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def archive_edits(request, id):
    time.sleep(0.5)
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

    log_serializer = LoadSerializer(editedLogs, many=True)
    # reverding data
    data = log_serializer.data[::-1]
    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def drivers_board(request, week_before):
    # calculating requested week start and week end
    week_start = get_week_start() - datetime.timedelta(days=(7 * week_before))
    week_end = week_start + datetime.timedelta(days=7)
    # till_today = datetime.datetime.now() + datetime.timedelta(days=1)

    dispatchers = User.objects.filter(role="DIS").values("username")
    dispatchers_list = [dispatcher["username"] for dispatcher in dispatchers]
    logs = Log.objects.filter(date__gte = week_start, date__lte = week_end)

    drivers = Driver.objects.all().values("id", "first_name", "last_name", "dispatcher", "gross_target")
    drivers = list(drivers)
    # drivers_serializer = DriversBoardSerializer(drivers, many=True)
    for d in drivers:
        print(d.id)


    for driver in drivers:
        driver.disp =''
        for d in dispatchers_list:
            if driver.dispatcher_id == d[0]:
                driver.disp = d[1]

        driver_logs = list(filter(lambda l: l.driver_id == driver.id, logs))
        total_miles = 0
        actual_gross = 0
        for l in driver_logs:
            total_miles += l.total_miles
            actual_gross += l.current_rate

        driver.loads = len(driver_logs)
        driver.total_miles = total_miles
        driver.actual_gross = actual_gross
        if total_miles == 0:
            driver.rate = 0
        else:    
            driver.rate = round((actual_gross / total_miles)*100) / 100

        if driver.gross_target == 0:
            driver.percentage = 0
        else:    
            driver.percentage = round((actual_gross / driver.gross_target) * 10000) / 100

    drivers = sorted(drivers, key=lambda d: d.percentage, reverse=True)

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

