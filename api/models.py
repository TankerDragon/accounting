from django.db import models
# from django.conf import settings
from core.models import User

DRIVER_TYPE = [
    ('O88', 'Owner operator - 88%'),
    ('O85', 'Owner operator - 85%'),
    ('C30', 'Company driver - 30%'),
    ('C35', 'Company driver - 35%'),
    ('L**', 'Lease operator'),
    ('R**', 'Rental operator')
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

# settings.AUTH_USER_MODEL
class Driver(models.Model):
    dispatcher = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    d_budget = models.DecimalField(max_digits=9, decimal_places=2, default=0)
    l_budget = models.DecimalField(max_digits=9, decimal_places=2, default=0)
    r_budget = models.DecimalField(max_digits=9, decimal_places=2, default=0)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    driver_type = models.CharField(max_length=3, choices=DRIVER_TYPE)
    gross_target = models.DecimalField(max_digits=9, decimal_places=2, blank=True, null=True, default=10000.00)
    is_active = models.BooleanField(default=1)

    def __str__(self):
        return self.first_name + ' ' + self.last_name

# class Group(models.Model):
#     staff = models.ForeignKey(User, on_delete=models.CASCADE)
#     driver = models.ForeignKey(Driver, on_delete=models.CASCADE)

class Log(models.Model):
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    original_rate = models.DecimalField(max_digits=9, decimal_places=2)
    current_rate = models.DecimalField(max_digits=9, decimal_places=2)
    change = models.DecimalField(max_digits=9, decimal_places=2)
    total_miles = models.IntegerField()
    budget_type = models.CharField(max_length=1, choices=BUDGET_TYPE)
    autobooker = models.BooleanField(default=False)
    bol_number = models.CharField(max_length=15, null=True, blank=True)
    pcs_number = models.CharField(max_length=15)
    trailer = models.CharField(max_length=16, blank=True)
    truck = models.CharField(max_length=16, blank=True)
    status = models.CharField(max_length=2, choices=LOAD_STATUS)
    origin = models.CharField(max_length=128)
    origin_state = models.CharField(max_length=2, choices=STATES)
    destination = models.CharField(max_length=128)
    destination_state = models.CharField(max_length=2, choices=STATES)
    date = models.DateField()
    time = models.TimeField()
    note = models.CharField(max_length=100, null=True, blank=True)
    is_edited = models.BooleanField(default=False)

class LogEdit(models.Model):
    original_log = models.ForeignKey(Log, on_delete=models.CASCADE, related_name='original')
    edited_log = models.ForeignKey(Log, on_delete=models.CASCADE, related_name='edited')
    date = models.DateTimeField(auto_now=True)
