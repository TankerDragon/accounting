from django.db import models
from django.contrib.auth.models import AbstractUser


USER_ROLES = [
    ('OWN', 'Owner'),
    ('ADM', 'Admin'),
    ('DIS', 'Dispatcher'),
    ('UPD', 'Updater'),
]

# Create your models here.
class User(AbstractUser):
    # email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=150, blank=False)
    last_name = models.CharField(max_length=150, blank=False)
    role = models.CharField(max_length=3, choices=USER_ROLES)
