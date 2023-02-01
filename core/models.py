from django.db import models
from django.contrib.auth.models import AbstractUser
from .constants import USER_ROLES


# Create your models here.
class User(AbstractUser):
    # email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=150, blank=False)
    last_name = models.CharField(max_length=150, blank=False)
    role = models.CharField(max_length=3, choices=USER_ROLES)
