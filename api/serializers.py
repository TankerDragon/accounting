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
        fields = ['first_name', 'last_name', 'username', 'password']

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
    

class DispatcherSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'date_joined']

class DispatcherNameSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name']

class LogSerializer (ModelSerializer):
    class Meta:
        model = Log
        fields = [
            'id', 
            'user', 
            'driver', 
            'dispatcher', 
            'budget_type', 
            'autobooker', 
            'current_rate', 
            'original_rate',
            'change', 
            'total_miles', 
            'date',
            'time',
            'pcs_number', 
            'bol_number',
            'trailer',
            'truck',
            'status', 
            'origin',
            'origin_state',
            'destination',
            'destination_state',
            'note',
            ]


# class EditLogSerializer (ModelSerializer):
#     class Meta:
#         model = Log
#         fields = ['id', 'budget_type', 'autobooker', 'current_rate', 'original_rate', 'change', 'total_miles', 'date', 'pcs_number', 'bol_number', 'note']

class CreateDriverSerializer(ModelSerializer):
    class Meta:
        model = Driver
        fields = ['first_name', 'last_name', 'driver_type', 'dispatcher', 'gross_target']

class CreateDispatcherSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'password']

    def validate_password(self, value: str) -> str:
        """    Hash value passed by user.    :param value: password of a user    :return: a hashed version of the password    """    
        return make_password(value)

class UpdateDispatcherSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name']

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

