from djoser.serializers import UserSerializer as BaseUserSerializer, UserCreateSerializer as  BaseUserCreateSerializer
from django.contrib.auth.hashers import make_password
from rest_framework.serializers import ModelSerializer
# from rest_framework import serializers
from .models import User, Appuser


class AppUserSerializer(ModelSerializer):
    class Meta:
        model = Appuser
        fields = '__all__'


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id', 'username', 'role', 'password', 'email', 'first_name', 'last_name']

    # def validate_password(self, value: str) -> str:
    #     """    Hash value passed by user.    :param value: password of a user    :return: a hashed version of the password    """    
    #     return make_password(value)
    

class UserSerializer(BaseUserSerializer):
    appuser = AppUserSerializer(read_only=True)
    class Meta(BaseUserSerializer.Meta):
        fields = ['id', 'username', 'role', 'email', 'first_name', 'last_name', 'appuser']

class UserListSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

    

# class UpdateUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'first_name', 'last_name']