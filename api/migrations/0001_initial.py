# Generated by Django 4.1.4 on 2023-02-16 08:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Action',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('operation', models.CharField(choices=[('cre', 'create'), ('upd', 'update'), ('del', 'delete'), ('dea', 'deactivate'), ('act', 'activate'), ('inv', 'invite'), ('exp', 'expire')], max_length=3)),
                ('target', models.BigIntegerField(null=True)),
                ('target_name', models.CharField(choices=[('dri', 'driver'), ('use', 'user'), ('gro', 'gross'), ('car', 'carrier'), ('veh', 'vehicle'), ('tra', 'trailer'), ('lin', 'invite link')], max_length=3)),
                ('time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Carrier',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=63)),
                ('address', models.CharField(max_length=255)),
                ('phone', models.CharField(max_length=15)),
                ('notes', models.CharField(blank=True, max_length=255, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('total_gross', models.DecimalField(decimal_places=2, default=0.0, max_digits=9)),
                ('total_loads', models.IntegerField(default=0)),
                ('setup_date', models.DateField(auto_now=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Driver',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=20)),
                ('last_name', models.CharField(max_length=20)),
                ('driver_type', models.CharField(choices=[('O88', 'Owner operator - 88%'), ('O85', 'Owner operator - 85%'), ('C30', 'Company driver - 30%'), ('C35', 'Company driver - 35%'), ('L', 'Lease operator'), ('R', 'Rental operator')], default='L', max_length=3)),
                ('status', models.CharField(choices=[('rea', 'Ready'), ('cov', 'Covered'), ('pre', 'Prebooked'), ('hom', 'Home'), ('enr', 'Enroute'), ('hol', 'Holiday'), ('res', 'Rest'), ('ina', 'Inactive')], default='rea', max_length=3)),
                ('gross_target', models.DecimalField(decimal_places=2, default=10000.0, max_digits=9)),
                ('notes', models.CharField(blank=True, max_length=255, null=True)),
                ('d_budget', models.DecimalField(decimal_places=2, default=0, max_digits=9)),
                ('l_budget', models.DecimalField(decimal_places=2, default=0, max_digits=9)),
                ('r_budget', models.DecimalField(decimal_places=2, default=0, max_digits=9)),
                ('last_status_change', models.DateTimeField(auto_now=True)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='EditCarrier',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=63)),
                ('address', models.CharField(max_length=255)),
                ('phone', models.CharField(max_length=15)),
                ('notes', models.CharField(blank=True, max_length=255, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('edit_time', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='EditDriver',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=20)),
                ('last_name', models.CharField(max_length=20)),
                ('driver_type', models.CharField(choices=[('O88', 'Owner operator - 88%'), ('O85', 'Owner operator - 85%'), ('C30', 'Company driver - 30%'), ('C35', 'Company driver - 35%'), ('L', 'Lease operator'), ('R', 'Rental operator')], default='L', max_length=3)),
                ('status', models.CharField(choices=[('rea', 'Ready'), ('cov', 'Covered'), ('pre', 'Prebooked'), ('hom', 'Home'), ('enr', 'Enroute'), ('hol', 'Holiday'), ('res', 'Rest'), ('ina', 'Inactive')], default='rea', max_length=3)),
                ('gross_target', models.DecimalField(decimal_places=2, default=10000.0, max_digits=9)),
                ('notes', models.CharField(blank=True, max_length=255, null=True)),
                ('edit_time', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='EditLoad',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('original_rate', models.DecimalField(decimal_places=2, max_digits=9)),
                ('current_rate', models.DecimalField(decimal_places=2, max_digits=9)),
                ('total_miles', models.IntegerField()),
                ('budget_type', models.CharField(choices=[('D', 'driver'), ('L', 'lane'), ('R', 'recovery')], max_length=1)),
                ('autobooker', models.BooleanField(default=False)),
                ('status', models.CharField(choices=[('CO', 'Covered'), ('SO', 'Sold'), ('TO', 'Tonu'), ('RJ', 'Rejected'), ('RM', 'Removed')], max_length=2)),
                ('origin', models.CharField(max_length=128)),
                ('origin_state', models.CharField(choices=[('AK', 'Alaska'), ('AL', 'Alabama'), ('AR', 'Arkansas'), ('AS', 'American Samoa'), ('AZ', 'Arizona'), ('CA', 'California'), ('CO', 'Colorado'), ('CT', 'Connecticut'), ('DC', 'District of Columbia'), ('DE', 'Delaware'), ('FL', 'Florida'), ('GA', 'Georgia'), ('GU', 'Guam'), ('HI', 'Hawaii'), ('IA', 'Iowa'), ('ID', 'Idaho'), ('IL', 'Illinois'), ('IN', 'Indiana'), ('KS', 'Kansas'), ('KY', 'Kentucky'), ('LA', 'Louisiana'), ('MA', 'Massachusetts'), ('MD', 'Maryland'), ('ME', 'Maine'), ('MI', 'Michigan'), ('MN', 'Minnesota'), ('MO', 'Missouri'), ('MS', 'Mississippi'), ('MT', 'Montana'), ('NC', 'North Carolina'), ('ND', 'North Dakota'), ('NE', 'Nebraska'), ('NH', 'New Hampshire'), ('NJ', 'New Jersey'), ('NM', 'New Mexico'), ('NV', 'Nevada'), ('NY', 'New York'), ('OH', 'Ohio'), ('OK', 'Oklahoma'), ('OR', 'Oregon'), ('PA', 'Pennsylvania'), ('PR', 'Puerto Rico'), ('RI', 'Rhode Island'), ('SC', 'South Carolina'), ('SD', 'South Dakota'), ('TN', 'Tennessee'), ('TX', 'Texas'), ('UT', 'Utah'), ('VA', 'Virginia'), ('VI', 'Virgin Islands'), ('VT', 'Vermont'), ('WA', 'Washington'), ('WI', 'Wisconsin'), ('WV', 'West Virginia'), ('WY', 'Wyoming')], max_length=2)),
                ('destination', models.CharField(max_length=128)),
                ('destination_state', models.CharField(choices=[('AK', 'Alaska'), ('AL', 'Alabama'), ('AR', 'Arkansas'), ('AS', 'American Samoa'), ('AZ', 'Arizona'), ('CA', 'California'), ('CO', 'Colorado'), ('CT', 'Connecticut'), ('DC', 'District of Columbia'), ('DE', 'Delaware'), ('FL', 'Florida'), ('GA', 'Georgia'), ('GU', 'Guam'), ('HI', 'Hawaii'), ('IA', 'Iowa'), ('ID', 'Idaho'), ('IL', 'Illinois'), ('IN', 'Indiana'), ('KS', 'Kansas'), ('KY', 'Kentucky'), ('LA', 'Louisiana'), ('MA', 'Massachusetts'), ('MD', 'Maryland'), ('ME', 'Maine'), ('MI', 'Michigan'), ('MN', 'Minnesota'), ('MO', 'Missouri'), ('MS', 'Mississippi'), ('MT', 'Montana'), ('NC', 'North Carolina'), ('ND', 'North Dakota'), ('NE', 'Nebraska'), ('NH', 'New Hampshire'), ('NJ', 'New Jersey'), ('NM', 'New Mexico'), ('NV', 'Nevada'), ('NY', 'New York'), ('OH', 'Ohio'), ('OK', 'Oklahoma'), ('OR', 'Oregon'), ('PA', 'Pennsylvania'), ('PR', 'Puerto Rico'), ('RI', 'Rhode Island'), ('SC', 'South Carolina'), ('SD', 'South Dakota'), ('TN', 'Tennessee'), ('TX', 'Texas'), ('UT', 'Utah'), ('VA', 'Virginia'), ('VI', 'Virgin Islands'), ('VT', 'Vermont'), ('WA', 'Washington'), ('WI', 'Wisconsin'), ('WV', 'West Virginia'), ('WY', 'Wyoming')], max_length=2)),
                ('note', models.CharField(blank=True, max_length=100, null=True)),
                ('bol_number', models.CharField(max_length=32)),
                ('pcs_number', models.CharField(max_length=16)),
                ('edit_time', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='EditTrailer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.CharField(max_length=20)),
                ('note', models.CharField(blank=True, max_length=255, null=True)),
                ('notes', models.CharField(blank=True, max_length=255, null=True)),
                ('is_active', models.BooleanField(default=1)),
                ('edit_time', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='EditVehicle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('unit_number', models.CharField(max_length=10, unique=True)),
                ('make', models.CharField(blank=True, max_length=15, null=True)),
                ('model', models.CharField(blank=True, max_length=20, null=True)),
                ('year', models.CharField(choices=[('Y99', '1999'), ('Y00', '2000'), ('Y01', '2001'), ('Y02', '2002'), ('Y03', '2003'), ('Y04', '2004'), ('Y05', '2005'), ('Y06', '2006'), ('Y07', '2007'), ('Y08', '2008'), ('Y09', '2009'), ('Y10', '2010'), ('Y11', '2011'), ('Y12', '2012'), ('Y13', '2013'), ('Y14', '2014'), ('Y15', '2015'), ('Y16', '2016'), ('Y17', '2017'), ('Y18', '2018'), ('Y19', '2019'), ('Y20', '2020'), ('Y21', '2021'), ('Y22', '2022'), ('Y23', '2023'), ('Y24', '2024'), ('Y24', '2025'), ('Y24', '2026')], default='23', max_length=3)),
                ('license_state', models.CharField(choices=[('AK', 'Alaska'), ('AL', 'Alabama'), ('AR', 'Arkansas'), ('AS', 'American Samoa'), ('AZ', 'Arizona'), ('CA', 'California'), ('CO', 'Colorado'), ('CT', 'Connecticut'), ('DC', 'District of Columbia'), ('DE', 'Delaware'), ('FL', 'Florida'), ('GA', 'Georgia'), ('GU', 'Guam'), ('HI', 'Hawaii'), ('IA', 'Iowa'), ('ID', 'Idaho'), ('IL', 'Illinois'), ('IN', 'Indiana'), ('KS', 'Kansas'), ('KY', 'Kentucky'), ('LA', 'Louisiana'), ('MA', 'Massachusetts'), ('MD', 'Maryland'), ('ME', 'Maine'), ('MI', 'Michigan'), ('MN', 'Minnesota'), ('MO', 'Missouri'), ('MS', 'Mississippi'), ('MT', 'Montana'), ('NC', 'North Carolina'), ('ND', 'North Dakota'), ('NE', 'Nebraska'), ('NH', 'New Hampshire'), ('NJ', 'New Jersey'), ('NM', 'New Mexico'), ('NV', 'Nevada'), ('NY', 'New York'), ('OH', 'Ohio'), ('OK', 'Oklahoma'), ('OR', 'Oregon'), ('PA', 'Pennsylvania'), ('PR', 'Puerto Rico'), ('RI', 'Rhode Island'), ('SC', 'South Carolina'), ('SD', 'South Dakota'), ('TN', 'Tennessee'), ('TX', 'Texas'), ('UT', 'Utah'), ('VA', 'Virginia'), ('VI', 'Virgin Islands'), ('VT', 'Vermont'), ('WA', 'Washington'), ('WI', 'Wisconsin'), ('WV', 'West Virginia'), ('WY', 'Wyoming')], default='AK', max_length=2)),
                ('license_number', models.CharField(blank=True, max_length=20, null=True)),
                ('vin_number', models.CharField(max_length=20, null=True)),
                ('fuel_type', models.CharField(choices=[('di', 'Diesel'), ('ga', 'Gasoline'), ('pr', 'Propane'), ('li', 'Liquid Natural Gas'), ('co', 'Compressed Natural Gas'), ('me', 'Methanol'), ('e', 'E-85'), ('m', 'M-85'), ('a', 'A55'), ('bi', 'Biodisel'), ('o', 'Other')], default='di', max_length=2)),
                ('notes', models.CharField(blank=True, max_length=255, null=True)),
                ('is_active', models.BooleanField(default=1)),
                ('edit_time', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Trailer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.CharField(max_length=20)),
                ('note', models.CharField(blank=True, max_length=255, null=True)),
                ('notes', models.CharField(blank=True, max_length=255, null=True)),
                ('is_active', models.BooleanField(default=1)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('unit_number', models.CharField(max_length=10, unique=True)),
                ('make', models.CharField(blank=True, max_length=15, null=True)),
                ('model', models.CharField(blank=True, max_length=20, null=True)),
                ('year', models.CharField(choices=[('Y99', '1999'), ('Y00', '2000'), ('Y01', '2001'), ('Y02', '2002'), ('Y03', '2003'), ('Y04', '2004'), ('Y05', '2005'), ('Y06', '2006'), ('Y07', '2007'), ('Y08', '2008'), ('Y09', '2009'), ('Y10', '2010'), ('Y11', '2011'), ('Y12', '2012'), ('Y13', '2013'), ('Y14', '2014'), ('Y15', '2015'), ('Y16', '2016'), ('Y17', '2017'), ('Y18', '2018'), ('Y19', '2019'), ('Y20', '2020'), ('Y21', '2021'), ('Y22', '2022'), ('Y23', '2023'), ('Y24', '2024'), ('Y24', '2025'), ('Y24', '2026')], default='23', max_length=3)),
                ('license_state', models.CharField(choices=[('AK', 'Alaska'), ('AL', 'Alabama'), ('AR', 'Arkansas'), ('AS', 'American Samoa'), ('AZ', 'Arizona'), ('CA', 'California'), ('CO', 'Colorado'), ('CT', 'Connecticut'), ('DC', 'District of Columbia'), ('DE', 'Delaware'), ('FL', 'Florida'), ('GA', 'Georgia'), ('GU', 'Guam'), ('HI', 'Hawaii'), ('IA', 'Iowa'), ('ID', 'Idaho'), ('IL', 'Illinois'), ('IN', 'Indiana'), ('KS', 'Kansas'), ('KY', 'Kentucky'), ('LA', 'Louisiana'), ('MA', 'Massachusetts'), ('MD', 'Maryland'), ('ME', 'Maine'), ('MI', 'Michigan'), ('MN', 'Minnesota'), ('MO', 'Missouri'), ('MS', 'Mississippi'), ('MT', 'Montana'), ('NC', 'North Carolina'), ('ND', 'North Dakota'), ('NE', 'Nebraska'), ('NH', 'New Hampshire'), ('NJ', 'New Jersey'), ('NM', 'New Mexico'), ('NV', 'Nevada'), ('NY', 'New York'), ('OH', 'Ohio'), ('OK', 'Oklahoma'), ('OR', 'Oregon'), ('PA', 'Pennsylvania'), ('PR', 'Puerto Rico'), ('RI', 'Rhode Island'), ('SC', 'South Carolina'), ('SD', 'South Dakota'), ('TN', 'Tennessee'), ('TX', 'Texas'), ('UT', 'Utah'), ('VA', 'Virginia'), ('VI', 'Virgin Islands'), ('VT', 'Vermont'), ('WA', 'Washington'), ('WI', 'Wisconsin'), ('WV', 'West Virginia'), ('WY', 'Wyoming')], default='AK', max_length=2)),
                ('license_number', models.CharField(blank=True, max_length=20, null=True)),
                ('vin_number', models.CharField(max_length=20, null=True)),
                ('fuel_type', models.CharField(choices=[('di', 'Diesel'), ('ga', 'Gasoline'), ('pr', 'Propane'), ('li', 'Liquid Natural Gas'), ('co', 'Compressed Natural Gas'), ('me', 'Methanol'), ('e', 'E-85'), ('m', 'M-85'), ('a', 'A55'), ('bi', 'Biodisel'), ('o', 'Other')], default='di', max_length=2)),
                ('notes', models.CharField(blank=True, max_length=255, null=True)),
                ('is_active', models.BooleanField(default=1)),
                ('eld_device', models.CharField(max_length=16, null=True)),
                ('driver', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.driver')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Load',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('original_rate', models.DecimalField(decimal_places=2, max_digits=9)),
                ('current_rate', models.DecimalField(decimal_places=2, max_digits=9)),
                ('total_miles', models.IntegerField()),
                ('budget_type', models.CharField(choices=[('D', 'driver'), ('L', 'lane'), ('R', 'recovery')], max_length=1)),
                ('autobooker', models.BooleanField(default=False)),
                ('bol_number', models.CharField(max_length=32, unique=True)),
                ('pcs_number', models.CharField(max_length=16, unique=True)),
                ('status', models.CharField(choices=[('CO', 'Covered'), ('SO', 'Sold'), ('TO', 'Tonu'), ('RJ', 'Rejected'), ('RM', 'Removed')], max_length=2)),
                ('origin', models.CharField(max_length=128)),
                ('origin_state', models.CharField(choices=[('AK', 'Alaska'), ('AL', 'Alabama'), ('AR', 'Arkansas'), ('AS', 'American Samoa'), ('AZ', 'Arizona'), ('CA', 'California'), ('CO', 'Colorado'), ('CT', 'Connecticut'), ('DC', 'District of Columbia'), ('DE', 'Delaware'), ('FL', 'Florida'), ('GA', 'Georgia'), ('GU', 'Guam'), ('HI', 'Hawaii'), ('IA', 'Iowa'), ('ID', 'Idaho'), ('IL', 'Illinois'), ('IN', 'Indiana'), ('KS', 'Kansas'), ('KY', 'Kentucky'), ('LA', 'Louisiana'), ('MA', 'Massachusetts'), ('MD', 'Maryland'), ('ME', 'Maine'), ('MI', 'Michigan'), ('MN', 'Minnesota'), ('MO', 'Missouri'), ('MS', 'Mississippi'), ('MT', 'Montana'), ('NC', 'North Carolina'), ('ND', 'North Dakota'), ('NE', 'Nebraska'), ('NH', 'New Hampshire'), ('NJ', 'New Jersey'), ('NM', 'New Mexico'), ('NV', 'Nevada'), ('NY', 'New York'), ('OH', 'Ohio'), ('OK', 'Oklahoma'), ('OR', 'Oregon'), ('PA', 'Pennsylvania'), ('PR', 'Puerto Rico'), ('RI', 'Rhode Island'), ('SC', 'South Carolina'), ('SD', 'South Dakota'), ('TN', 'Tennessee'), ('TX', 'Texas'), ('UT', 'Utah'), ('VA', 'Virginia'), ('VI', 'Virgin Islands'), ('VT', 'Vermont'), ('WA', 'Washington'), ('WI', 'Wisconsin'), ('WV', 'West Virginia'), ('WY', 'Wyoming')], max_length=2)),
                ('destination', models.CharField(max_length=128)),
                ('destination_state', models.CharField(choices=[('AK', 'Alaska'), ('AL', 'Alabama'), ('AR', 'Arkansas'), ('AS', 'American Samoa'), ('AZ', 'Arizona'), ('CA', 'California'), ('CO', 'Colorado'), ('CT', 'Connecticut'), ('DC', 'District of Columbia'), ('DE', 'Delaware'), ('FL', 'Florida'), ('GA', 'Georgia'), ('GU', 'Guam'), ('HI', 'Hawaii'), ('IA', 'Iowa'), ('ID', 'Idaho'), ('IL', 'Illinois'), ('IN', 'Indiana'), ('KS', 'Kansas'), ('KY', 'Kentucky'), ('LA', 'Louisiana'), ('MA', 'Massachusetts'), ('MD', 'Maryland'), ('ME', 'Maine'), ('MI', 'Michigan'), ('MN', 'Minnesota'), ('MO', 'Missouri'), ('MS', 'Mississippi'), ('MT', 'Montana'), ('NC', 'North Carolina'), ('ND', 'North Dakota'), ('NE', 'Nebraska'), ('NH', 'New Hampshire'), ('NJ', 'New Jersey'), ('NM', 'New Mexico'), ('NV', 'Nevada'), ('NY', 'New York'), ('OH', 'Ohio'), ('OK', 'Oklahoma'), ('OR', 'Oregon'), ('PA', 'Pennsylvania'), ('PR', 'Puerto Rico'), ('RI', 'Rhode Island'), ('SC', 'South Carolina'), ('SD', 'South Dakota'), ('TN', 'Tennessee'), ('TX', 'Texas'), ('UT', 'Utah'), ('VA', 'Virginia'), ('VI', 'Virgin Islands'), ('VT', 'Vermont'), ('WA', 'Washington'), ('WI', 'Wisconsin'), ('WV', 'West Virginia'), ('WY', 'Wyoming')], max_length=2)),
                ('note', models.CharField(blank=True, max_length=100, null=True)),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('carrier', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.carrier')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
