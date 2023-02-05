from django.db import models
# from django.conf import settings
from core.models import User
from core.constants import DRIVER_TYPE, DEFAULT_DRIVER_TYPE, DRIVER_STATUS, DEFAULT_DRIVER_STATUS, YEARS, DEFAULT_YEAR, STATES, FUEL_TYPE, BUDGET_TYPE, LOAD_STATUS, OPERATIONS, TARGET_NAMES, STATUS_CHOICES, COUNTRIES, TIME_ZONES


class Carrier(models.Model):
    name = models.CharField(max_length=63)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)
    total_gross = models.DecimalField(max_digits=9, decimal_places=2, default=0.00)
    total_loads = models.IntegerField(default=0)
    notes = models.CharField(max_length=255, null=True, blank=True)


class Driver(models.Model):
    dispatcher = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    # current_load = None
    d_budget = models.DecimalField(max_digits=9, decimal_places=2, default=0)
    l_budget = models.DecimalField(max_digits=9, decimal_places=2, default=0)
    r_budget = models.DecimalField(max_digits=9, decimal_places=2, default=0)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    driver_type = models.CharField(max_length=3, choices=DRIVER_TYPE, default=DEFAULT_DRIVER_TYPE)
    status = models.CharField(max_length=3, choices=DRIVER_STATUS, default=DEFAULT_DRIVER_STATUS)
    last_status_change = models.DateTimeField(auto_now=True)
    gross_target = models.DecimalField(max_digits=9, decimal_places=2, default=10000.00)
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.first_name + ' ' + self.last_name

# class Group(models.Model):
#     staff = models.ForeignKey(User, on_delete=models.CASCADE)
#     driver = models.ForeignKey(Driver, on_delete=models.CASCADE)

class Vehicle(models.Model):
    driver = models.ForeignKey(Driver, null=True, on_delete=models.SET_NULL)
    unit_number = models.CharField(max_length=10, unique=True)
    make = models.CharField(max_length=15, null=True, blank=True)
    model = models.CharField(max_length=20, null=True, blank=True)
    year = models.CharField(max_length=3, choices=YEARS, default=DEFAULT_YEAR)
    license_state = models.CharField(max_length=2, choices=STATES, default='AK')
    license_number = models.CharField(max_length=20, null=True, blank=True)
    vin_number = models.CharField(max_length=20, null=True)
    fuel_type = models.CharField(max_length=2, choices=FUEL_TYPE, default='di')
    eld_device = models.CharField(max_length=16, null=True)
    notes = models.CharField(max_length=255, null=True, blank=True)
    is_active = models.BooleanField(default=1)

    def __str__(self):
        return self.unit_number


class Trailer(models.Model):
    number = models.CharField(max_length=20)
    note = models.CharField(max_length=255, null=True, blank=True)


class Load(models.Model):
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    dispatcher = models.ForeignKey(User, on_delete=models.CASCADE, related_name='dispatcher')
    carrier = models.ForeignKey(Carrier, on_delete=models.SET_NULL, null=True)
    truck = models.ForeignKey(Vehicle, on_delete=models.SET_NULL, null=True)
    trailer = models.ForeignKey(Trailer, on_delete=models.SET_NULL, null=True)
    original_rate = models.DecimalField(max_digits=9, decimal_places=2)
    current_rate = models.DecimalField(max_digits=9, decimal_places=2)
    change = models.DecimalField(max_digits=9, decimal_places=2)
    total_miles = models.IntegerField()
    budget_type = models.CharField(max_length=1, choices=BUDGET_TYPE)
    autobooker = models.BooleanField(default=False)
    bol_number = models.CharField(max_length=32)
    pcs_number = models.CharField(max_length=16)
    status = models.CharField(max_length=2, choices=LOAD_STATUS)
    origin = models.CharField(max_length=128)
    origin_state = models.CharField(max_length=2, choices=STATES)
    destination = models.CharField(max_length=128)
    destination_state = models.CharField(max_length=2, choices=STATES)
    time = models.DateTimeField(auto_now_add=True)
    note = models.CharField(max_length=100, null=True, blank=True)
    is_edited = models.BooleanField(default=False)


class LoadEdit(models.Model):
    original_load = models.ForeignKey(Load, on_delete=models.CASCADE, related_name='original')
    edited_load = models.ForeignKey(Load, on_delete=models.CASCADE, related_name='edited')
    date = models.DateTimeField(auto_now=True)


class Action(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    operation = models.CharField(max_length=3, choices=OPERATIONS)
    target = models.BigIntegerField(null=True)
    target_name = models.CharField(max_length=3, choices=TARGET_NAMES)
    time = models.DateTimeField(auto_now_add=True)


# ELD stuff 
class Elog(models.Model):
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE)
    status = models.CharField(max_length=3, choices=STATUS_CHOICES, default='OFF')
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=50, null=True, blank=True)
    lat = models.DecimalField(max_digits=12, decimal_places=9, null=True, blank=True)
    lng = models.DecimalField(max_digits=12, decimal_places=9, null=True, blank=True)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.SET_NULL, null=True, blank=True)
    odometer = models.IntegerField(null=True, blank=True)
    eng_hours = models.DecimalField(max_digits=6, decimal_places=1, null=True, blank=True)
    notes = models.CharField(max_length=20, null=True, blank=True)
    document = models.CharField(max_length=20, null=True, blank=True)
    trailer = models.CharField(max_length=20, null=True, blank=True)