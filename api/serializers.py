from rest_framework.serializers import ModelSerializer, Serializer, SerializerMethodField
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from core.models import User
from core.serializers import UserSerializer
from .models import Driver, EditDriver, Load, EditLoad, Carrier, EditCarrier


class DriverSerializer(ModelSerializer):
    class Meta:
        model = Driver
        # fields = ['id',  'first_name', 'last_name', 'dispatcher', 'driver_type', 'gross_target', 'is_active']
        fields = '__all__'

    def update(self, instance: Driver, validated_data):
        # updating
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        # saving updates
        request_user_id = self.initial_data.get('request_user_id')
        edit = EditDriver()
        for attr, value in validated_data.items():
            setattr(edit, attr, value)
        edit.driver_id = instance.id
        edit.user_id = request_user_id
        edit.save()
        return instance

class DriverListSerializer(ModelSerializer):
    class Meta:
        model = Driver
        fields = ['id', 'first_name', 'last_name']

class DriverEditSerializer(ModelSerializer):
    class Meta:
        model = EditDriver
        fields = '__all__'

class DriverActivitySerializer(ModelSerializer):
    class Meta:
        model = EditDriver
        fields = ['status', 'edit_time']


class CarrierSerializer(ModelSerializer):
    class Meta:
        model = Carrier
        fields = '__all__'

    def update(self, instance: Carrier, validated_data):
        # updating
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        # saving updates
        request_user_id = self.initial_data.get('request_user_id')
        edit = EditCarrier()
        for attr, value in validated_data.items():
            setattr(edit, attr, value)
        edit.carrier_id = instance.id
        edit.user_id = request_user_id
        edit.save()
        return instance

class CarrierListSerializer(ModelSerializer):
    class Meta:
        model = Carrier
        fields = ['id', 'name']

class CarrierEditSerializer(ModelSerializer):
    class Meta:
        model = EditCarrier
        fields = '__all__'


class LoadSerializer(ModelSerializer):
    change = SerializerMethodField(method_name='calculate_change')
    class Meta:
        model = Load
        fields = '__all__'
        read_only_fields = ['change']

    def calculate_change(self, load: Load):
        return load.original_rate - load.current_rate
    
    def update(self, instance: EditLoad, validated_data):
        # updating
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        # saving updates
        request_user_id = self.initial_data.get('request_user_id')
        edit = EditLoad()
        for attr, value in validated_data.items():
            setattr(edit, attr, value)
        edit.load_id = instance.id
        edit.user_id = request_user_id
        edit.save()
        return instance
    
class LoadEditSerializer(ModelSerializer):
    change = SerializerMethodField(method_name='calculate_change')
    class Meta:
        model = EditLoad
        fields = '__all__'
        read_only_fields = ['change']

    def calculate_change(self, load: Load):
        return load.original_rate - load.current_rate


class LoadSerializerOld (ModelSerializer):
    class Meta:
        model = Load
        fields = '__all__'
        read_only_fields = ['change', 'time', 'is_edited']

    def validate_pcs_number(self, value):
        # check when requested to update and pcs number is not changed
        if self.instance and self.instance.pcs_number == value:
            return value
        # othervise
        numOfPCSNumbers = Load.objects.filter(pcs_number=value).count()
        if numOfPCSNumbers != 0:
            raise serializers.ValidationError(['This number is used before'])
        return value

    def create(self, validated_data):
        log = Load(**validated_data)
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

    def update(self, instance: Load, validated_data):
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

