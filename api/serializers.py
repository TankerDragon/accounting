from rest_framework.serializers import ModelSerializer
from core.models import User
from .models import Driver, Log


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'password']

class DriverSerializer(ModelSerializer):
    # user_id = serializers.IntegerField(read_only=True)
    # app_version = serializers.CharField(read_only=True)
    class Meta:
        model = Driver
        fields = ['id', 'dispatcher_id', 'd_budget', 'l_budget', 'r_budget', 's_budget', 'first_name', 'last_name', 'driver_type', 'gross_target', 'is_active']

class DispatcherSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'last_login', 'date_joined']

class LogSerializer (ModelSerializer):
    # driver = serializers.PrimaryKeyRelatedField(
    #     queryset = Driver.objects.all()
    # )
    # change = serializers.SerializerMethodField(method_name="calculate_change")
    class Meta:
        model = Log
        fields = ['id', 'driver_id', 'user_id', 'change', 'budget_type', 'current_rate', 'original_rate', 'total_miles', 'pcs_number', 'bol_number', 'note']

class CreateDriverSerializer(ModelSerializer):
    class Meta:
        model = Driver
        fields = ['first_name', 'last_name', 'driver_type', 'dispatcher_id', 'gross_target']

class CreateDispatcherSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'password']
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