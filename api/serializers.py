from rest_framework.serializers import ModelSerializer, Serializer
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from core.models import User
from .models import Driver, Log


class LogDecimalFielsSerializer(Serializer):
    current_rate = serializers.DecimalField(max_digits=9, decimal_places=2)
    original_rate = serializers.DecimalField(max_digits=9, decimal_places=2)


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'role']

class DriverSerializer(ModelSerializer):
    # user_id = serializers.IntegerField(read_only=True)
    # app_version = serializers.CharField(read_only=True)
    class Meta:
        model = Driver
        fields = ['id',  'first_name', 'last_name', 'dispatcher', 'driver_type', 'gross_target', 'is_active']

class DriversBoardSerializer(ModelSerializer):
    class Meta:
        model = Driver
        fields = ['id', 'dispatcher', 'first_name', 'last_name', 'gross_target']

class DriverNameSerializer(ModelSerializer):
    class Meta:
        model = Driver
        fields = ['id', 'first_name', 'last_name']
    

class DispatcherNameSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name']

class LogSerializer (ModelSerializer):
    class Meta:
        model = Log
        fields = '__all__'
        read_only_fields = ['change', 'time', 'is_edited']

    def validate_pcs_number(self, value):
        # check when requested to update and pcs number is not changed
        if self.instance and self.instance.pcs_number == value:
            return value
        # othervise
        numOfPCSNumbers = Log.objects.filter(pcs_number=value).count()
        if numOfPCSNumbers != 0:
            raise serializers.ValidationError(['This number is used before'])
        return value

    def create(self, validated_data):
        log = Log(**validated_data)
        log.change =  log.original_rate - log.current_rate
        log.save()
        # updating driver's budget
        if log.budget_type == 'D':
            log.driver.d_budget += log.change
        elif log.budget_type == 'L':
            log.driver.l_budget += log.change
        elif log.budget_type == 'R':
            log.driver.r_budget += log.change
        log.driver.save()
        return log

    def update(self, instance: Log, validated_data):
        # updating driver's budget
        old_change = instance.change
        old_type = instance.budget_type
        old_driver = Driver.objects.get(pk=instance.driver.id)
        budget_type = validated_data.get('budget_type')
        change = validated_data.get('original_rate') - validated_data.get('current_rate')
        driver = Driver.objects.get(pk=validated_data['driver'].id)
        # remove old change from old driver
        if old_type == 'D':
            old_driver.d_budget -= old_change
        elif old_type == 'L':
            old_driver.l_budget -= old_change
        elif old_type == 'R':
            old_driver.r_budget -= old_change
        old_driver.save()
        # add new change to requested driver
        if budget_type == 'D':
            driver.d_budget += change
        elif budget_type == 'L':
            driver.l_budget += change
        elif budget_type == 'R':
            driver.r_budget += change
        driver.save()
        # mark the log as edited
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.change = change
        instance.is_edited = True
        instance.save()
        return instance




# class EditLogSerializer (ModelSerializer):
#     class Meta:
#         model = Log
#         fields = ['id', 'budget_type', 'autobooker', 'current_rate', 'original_rate', 'change', 'total_miles', 'date', 'pcs_number', 'bol_number', 'note']

class CreateDriverSerializer(ModelSerializer):
    class Meta:
        model = Driver
        fields = ['first_name', 'last_name', 'driver_type', 'dispatcher', 'gross_target']

class CreateUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'role', 'password']

    def validate_password(self, value: str) -> str:
        """    Hash value passed by user.    :param value: password of a user    :return: a hashed version of the password    """    
        return make_password(value)

class UpdateDispatcherSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'role']

# class VehicleSerializer(ModelSerializer):
#     driver_id = serializers.IntegerField(required=False)
#     class Meta:
#         model = Vehicle
#         fields = ['id', 'driver_id', 'year', 'unit_number', 'fuel_type', 'make', 'model', 'license_number', 'license_state', 'notes']

# class UpdateVehicleSerializer(ModelSerializer):
#     class Meta:
#         model = Vehicle
#         fields = ['id', 'year', 'unit_number', 'fuel_type', 'make', 'model', 'license_number', 'license_state', 'notes']

# class LogSerializer(ModelSerializer):
#     class Meta:
#         model = Log
#         fields = ['id', 'driver', 'status', 'date', 'time', 'location', 'lat', 'lng', 'vehicle', 'odometer', 'eng_hours', 'notes', 'document', 'trailer']

