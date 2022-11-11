from django.db import models
# from django.conf import settings
from core.models import User

DRIVER_TYPE = [
    ('O88', 'Owner operator - 88%'),
    ('O85', 'Owner operator - 85%'),
    ('C30', 'Company driver - 30%'),
    ('C35', 'Company driver - 35%'),
    ('L', 'Lease operator'),
    ('R', 'Rental operator')
]

BUDGET_TYPE = [
    ('D', 'driver'), 
    ('L', 'lane'), 
    ('R', 'recovery')
]

LOAD_STATUS = [
    ('CO', 'Covered'),
    ('SO', 'Sold'),
    ('TO', 'Tonu'),
    ('RJ', 'Rejected'),
    ('RM', 'Removed'),
]

STATES = [
    ("AK", "Alaska"), 
    ("AL", "Alabama"), 
    ("AR", "Arkansas"), 
    ("AS", "American Samoa"), 
    ("AZ", "Arizona"), 
    ("CA", "California"), 
    ("CO", "Colorado"), 
    ("CT", "Connecticut"), 
    ("DC", "District of Columbia"), 
    ("DE", "Delaware"), 
    ("FL", "Florida"), 
    ("GA", "Georgia"), 
    ("GU", "Guam"), 
    ("HI", "Hawaii"), 
    ("IA", "Iowa"), 
    ("ID", "Idaho"), 
    ("IL", "Illinois"), 
    ("IN", "Indiana"), 
    ("KS", "Kansas"), 
    ("KY", "Kentucky"), 
    ("LA", "Louisiana"), 
    ("MA", "Massachusetts"), 
    ("MD", "Maryland"), 
    ("ME", "Maine"), 
    ("MI", "Michigan"), 
    ("MN", "Minnesota"), 
    ("MO", "Missouri"), 
    ("MS", "Mississippi"), 
    ("MT", "Montana"), 
    ("NC", "North Carolina"), 
    ("ND", "North Dakota"), 
    ("NE", "Nebraska"), 
    ("NH", "New Hampshire"), 
    ("NJ", "New Jersey"), 
    ("NM", "New Mexico"), 
    ("NV", "Nevada"), 
    ("NY", "New York"), 
    ("OH", "Ohio"), 
    ("OK", "Oklahoma"), 
    ("OR", "Oregon"), 
    ("PA", "Pennsylvania"), 
    ("PR", "Puerto Rico"), 
    ("RI", "Rhode Island"), 
    ("SC", "South Carolina"), 
    ("SD", "South Dakota"), 
    ("TN", "Tennessee"), 
    ("TX", "Texas"), 
    ("UT", "Utah"), 
    ("VA", "Virginia"), 
    ("VI", "Virgin Islands"), 
    ("VT", "Vermont"), 
    ("WA", "Washington"), 
    ("WI", "Wisconsin"), 
    ("WV", "West Virginia"), 
    ("WY", "Wyoming")
]

OPERATIONS = [
    ('cre', 'create'),
    ('upd', 'update'),
    ('del', 'delete'),
    ('dea', 'deactivate'),
    ('act', 'activate'),
    ('inv', 'invite'),
    ('exp', 'expire'),
]
TARGET_NAMES = [
    ('dri', 'driver'),
    ('use', 'user'),
    ('gro', 'gross'),
    ('lin', 'invite link'),
]

STATUS_CHOICES_TTDATA = [
    ('OFF', 'OFF'),
    ('SB', 'SB'),
    ('DR', 'DR'),
    ('ON', 'ON'),
    ('YM', 'YM'),
    ('PC', 'PC'),
    ('LIN', 'LOGIN'),
    ('LOU', 'LOGOUT'),
    ('POF', 'POWER OFF'),
    ('PON', 'POWER ON'),
    ('CER', 'CERTIFY'),
    ('INT', 'INTERMEDIATE')
]

YEARS = (
    ('99', '1999'),
    ('00', '2000'),
    ('01', '2001'),
    ('02', '2002'),
    ('03', '2003'),
    ('04', '2004'),
    ('05', '2005'),
    ('06', '2006'),
    ('07', '2007'),
    ('08', '2008'),
    ('09', '2009'),
    ('10', '2010'),
    ('11', '2011'),
    ('12', '2012'),
    ('13', '2013'),
    ('14', '2014'),
    ('15', '2015'),
    ('16', '2016'),
    ('17', '2017'),
    ('18', '2018'),
    ('19', '2019'),
    ('20', '2020'),
    ('21', '2021'),
    ('22', '2022'),
    ('23', '2023'),
    ('24', '2024'),
)
DEFAULT_YEAR = '22'
FUEL_TYPE = (
('di', 'Diesel'),
('ga', 'Gasoline'),
('pr', 'Propane'),
('li', 'Liquid Natural Gas'),
('co', 'Compressed Natural Gas'),
('me', 'Methanol'),
('e', 'E-85'),
('m', 'M-85'),
('a', 'A55'),
('bi', 'Biodisel'),
('o', 'Other'),
)

# settings.AUTH_USER_MODEL
class Driver(models.Model):
    dispatcher = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    d_budget = models.DecimalField(max_digits=9, decimal_places=2, default=0)
    l_budget = models.DecimalField(max_digits=9, decimal_places=2, default=0)
    r_budget = models.DecimalField(max_digits=9, decimal_places=2, default=0)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    driver_type = models.CharField(max_length=3, choices=DRIVER_TYPE)
    gross_target = models.DecimalField(max_digits=9, decimal_places=2, default=10000.00)
    is_active = models.BooleanField(default=1)

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
    year = models.CharField(max_length=2, choices=YEARS, default=DEFAULT_YEAR)
    license_state = models.CharField(max_length=2, choices=STATES, default='AK')
    license_number = models.CharField(max_length=20, null=True, blank=True)
    vin_number = models.CharField(max_length=20, null=True)
    fuel_type = models.CharField(max_length=2, choices=FUEL_TYPE, default='di')
    eld_device = models.CharField(max_length=16, null=True)
    notes = models.CharField(max_length=255, null=True, blank=True)
    is_active = models.BooleanField(default=1)

    def __str__(self):
        return self.unit_number

class Log(models.Model):
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    dispatcher = models.ForeignKey(User, on_delete=models.CASCADE, related_name='dispatcher')
    original_rate = models.DecimalField(max_digits=9, decimal_places=2)
    current_rate = models.DecimalField(max_digits=9, decimal_places=2)
    change = models.DecimalField(max_digits=9, decimal_places=2)
    total_miles = models.IntegerField()
    budget_type = models.CharField(max_length=1, choices=BUDGET_TYPE)
    autobooker = models.BooleanField(default=False)
    bol_number = models.CharField(max_length=32)
    carrier = models.CharField(max_length=32)
    pcs_number = models.CharField(max_length=16)
    trailer = models.CharField(max_length=16, blank=True)
    truck = models.CharField(max_length=16, blank=True)
    status = models.CharField(max_length=2, choices=LOAD_STATUS)
    origin = models.CharField(max_length=128)
    origin_state = models.CharField(max_length=2, choices=STATES)
    destination = models.CharField(max_length=128)
    destination_state = models.CharField(max_length=2, choices=STATES)
    time = models.DateTimeField(auto_now_add=True)
    note = models.CharField(max_length=100, null=True, blank=True)
    is_edited = models.BooleanField(default=False)

class LogEdit(models.Model):
    original_log = models.ForeignKey(Log, on_delete=models.CASCADE, related_name='original')
    edited_log = models.ForeignKey(Log, on_delete=models.CASCADE, related_name='edited')
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
    status = models.CharField(max_length=3, choices= STATUS_CHOICES_TTDATA, default='OFF')
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