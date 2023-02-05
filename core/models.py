from django.db import models
from django.contrib.auth.models import AbstractUser
from .constants import USER_ROLES


# Create your models here.
class User(AbstractUser):
    # email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=150, blank=False)
    last_name = models.CharField(max_length=150, blank=False)
    role = models.CharField(max_length=3, choices=USER_ROLES)


class Appuser(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    # company = models.ForeignKey(Company, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    view_user = models.BooleanField(default=False)
    create_user = models.BooleanField(default=False)
    update_user = models.BooleanField(default=False)
    activate_user = models.BooleanField(default=False)

    view_driver = models.BooleanField(default=False)
    create_driver = models.BooleanField(default=False)
    update_driver = models.BooleanField(default=False)
    activate_driver = models.BooleanField(default=False)

    view_carrier = models.BooleanField(default=False)
    create_carrier = models.BooleanField(default=False)
    update_carrier = models.BooleanField(default=False)
    activate_carrier = models.BooleanField(default=False)

    view_vehicle = models.BooleanField(default=False)
    create_vehicle = models.BooleanField(default=False)
    update_vehicle = models.BooleanField(default=False)
    activate_vehicle = models.BooleanField(default=False)

    view_trailer = models.BooleanField(default=False)
    create_trailer = models.BooleanField(default=False)
    update_trailer = models.BooleanField(default=False)
    activate_trailer = models.BooleanField(default=False)
