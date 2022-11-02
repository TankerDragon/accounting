# data['date'] = datetime.date.today()
# data['time'] = datetime.datetime.now().strftime("%H:%M:%S")
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
from .serializers import DriverSerializer, DriverNameSerializer, DispatcherNameSerializer, LogSerializer, CreateDriverSerializer, CreateUserSerializer, LogDecimalFielsSerializer, UpdateDispatcherSerializer, DriversBoardSerializer
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
@permission_classes([IsAuthenticated])
def test(request):
    # notify_customers.delay('hello')
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def register(request):
    serializer = UserCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': 'created!'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST', 'PUT'])
@permission_classes([IsAuthenticated])
def drivers(request):
    if request.method == 'GET':
        #preparing dispatcher names
        dispatcher_names = User.objects.filter(role='DIS').values('id', 'first_name', 'last_name')
        dispatcher_names_serializer = DispatcherNameSerializer(dispatcher_names, many=True)

        drivers_query = Driver.objects.all().order_by('first_name')
        drivers_serializer = DriverSerializer(drivers_query, many=True)
        return Response({"drivers": drivers_serializer.data, "dispatchers": dispatcher_names_serializer.data}, status=status.HTTP_200_OK)

    if request.method == 'POST':
        # check if requested user has access
        role = request.user.role
        if role == "OWN" or role == "ADM": 
            driver_serializer = CreateDriverSerializer(data=request.data)
            if driver_serializer.is_valid():
                driver_serializer.save()
                return Response({'success': 'driver has been succesfully created'}, status=status.HTTP_201_CREATED)
            return Response(driver_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'you have no access to create a driver'}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'PUT':
        driver = Driver.objects.get(pk=request.data["id"])
        driver_serializer = CreateDriverSerializer(instance=driver, data=request.data)
        if driver_serializer.is_valid():
            driver_serializer.save()
            return Response({'success': 'driver has been succesfully updated'}, status=status.HTTP_200_OK)
        return Response(driver_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST', 'PUT'])
@permission_classes([IsAuthenticated])
def users(request):
    if request.method == 'GET':
        users = User.objects.all()
        user_serializer = UserSerializer(users, many=True)            
        return Response(user_serializer.data, status=status.HTTP_200_OK)

    if request.method == 'POST':
        # check if requested user has access and check if requested user can create requested type of user
        role = request.user.role
        requested_role = request.data["role"]
        if role == "OWN" or (role == "ADM" and (requested_role != "OWN" and requested_role != "ADM")):
            user_serializer = CreateUserSerializer(data=request.data)
            if user_serializer.is_valid():
                user_serializer.save()
                return Response({'success': 'user has been succesfully cerated'}, status=status.HTTP_201_CREATED)
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'you have no access to create user'}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'PUT':
        # check if requested user has access and check if requested user can update requested type of user
        role = request.user.role
        requested_role = request.data["role"]
        if role == "OWN" or (role == "ADM" and (requested_role != "OWN" and requested_role != "ADM")):
            user = User.objects.get(pk=request.data["id"])
            user_serializer = UserSerializer(instance=user, data=request.data)
            if user_serializer.is_valid():
                user_serializer.save()
                return Response({'success': 'user has been succesfully updated'}, status=status.HTTP_200_OK)
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'you have no access to update this user'}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'POST', 'PUT'])
@permission_classes([IsAuthenticated])
def gross(request):
    if request.method == 'GET':
        #preparing driver names
        driver_names = Driver.objects.all().values('id', 'first_name', 'last_name')
        driver_names_serializer = DriverNameSerializer(driver_names, many=True)

        #preparing dispatcher names
        dispatcher_names = User.objects.filter(role='DIS').values('id', 'first_name', 'last_name')
        dispatcher_names_serializer = DispatcherNameSerializer(dispatcher_names, many=True)

        queryset = Log.objects.all().order_by('-time')
        log_serializer = LogSerializer(queryset, many=True)

        return Response({"logs": log_serializer.data, "drivers": driver_names_serializer.data, "dispatchers": dispatcher_names_serializer.data}, status=status.HTTP_200_OK)

    if request.method == "POST":
        data = request.data
        data['user'] = request.user.id
        log_serializer = LogSerializer(data=data)
        if log_serializer.is_valid():
            log_serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(log_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'PUT':
        data = request.data
        log = Log.objects.get(pk=data["id"])
        old_change = log.change
        log_serializer = LogSerializer(instance=log, data=data)
        if log_serializer.is_valid():
            log_serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(log_serializer.errors, status=status.HTTP_400_BAD_REQUEST)




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

