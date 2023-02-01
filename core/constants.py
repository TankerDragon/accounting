USER_ROLES = [
    ('OWN', 'Owner'),
    ('STA', 'Staff'),
    ('DIS', 'Dispatcher'),
    ('UPD', 'Updater'),
]

COUNTRIES = [
    ('US', 'United States'),
    ('CA', 'Canada'),
]

DRIVER_TYPE = [
    ('O88', 'Owner operator - 88%'),
    ('O85', 'Owner operator - 85%'),
    ('C30', 'Company driver - 30%'),
    ('C35', 'Company driver - 35%'),
    ('L', 'Lease operator'),
    ('R', 'Rental operator')
]

DRIVER_STATUS = [
    ('rea', 'Ready'),
    ('cov', 'Covered'),
    ('pre', 'Prebooked'),
    ('hom', 'Home'),
    ('enr', 'Enroute'),
    ('hol', 'Holiday'),
    ('res', 'Rest'),
    ('ina', 'Inactive'),
]
DEFAULT_DRIVER_STATUS = 'rea'

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

STATUS_CHOICES = [
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
    ('Y99', '1999'),
    ('Y00', '2000'),
    ('Y01', '2001'),
    ('Y02', '2002'),
    ('Y03', '2003'),
    ('Y04', '2004'),
    ('Y05', '2005'),
    ('Y06', '2006'),
    ('Y07', '2007'),
    ('Y08', '2008'),
    ('Y09', '2009'),
    ('Y10', '2010'),
    ('Y11', '2011'),
    ('Y12', '2012'),
    ('Y13', '2013'),
    ('Y14', '2014'),
    ('Y15', '2015'),
    ('Y16', '2016'),
    ('Y17', '2017'),
    ('Y18', '2018'),
    ('Y19', '2019'),
    ('Y20', '2020'),
    ('Y21', '2021'),
    ('Y22', '2022'),
    ('Y23', '2023'),
    ('Y24', '2024'),
    ('Y24', '2025'),
    ('Y24', '2026'),
)
DEFAULT_YEAR = '23'
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

WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

TIME_ZONES = [
    ('US/Cent', 'US/Central'),
    ('US/East', 'US/Eastern'),
    ('US/Moun', 'US/Mountain'),
    ('US/Paci', 'US/Pacific'),
]
