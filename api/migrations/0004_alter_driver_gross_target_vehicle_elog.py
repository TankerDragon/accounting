# Generated by Django 4.0.4 on 2022-11-04 16:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_driver_gross_target'),
    ]

    operations = [
        migrations.AlterField(
            model_name='driver',
            name='gross_target',
            field=models.DecimalField(decimal_places=2, default=10000.0, max_digits=9),
        ),
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('unit_number', models.CharField(max_length=10, unique=True)),
                ('make', models.CharField(blank=True, max_length=15, null=True)),
                ('model', models.CharField(blank=True, max_length=20, null=True)),
                ('year', models.CharField(choices=[('99', '1999'), ('00', '2000'), ('01', '2001'), ('02', '2002'), ('03', '2003'), ('04', '2004'), ('05', '2005'), ('06', '2006'), ('07', '2007'), ('08', '2008'), ('09', '2009'), ('10', '2010'), ('11', '2011'), ('12', '2012'), ('13', '2013'), ('14', '2014'), ('15', '2015'), ('16', '2016'), ('17', '2017'), ('18', '2018'), ('19', '2019'), ('20', '2020'), ('21', '2021'), ('22', '2022'), ('23', '2023'), ('24', '2024')], default='22', max_length=2)),
                ('license_state', models.CharField(choices=[('AK', 'Alaska'), ('AL', 'Alabama'), ('AR', 'Arkansas'), ('AS', 'American Samoa'), ('AZ', 'Arizona'), ('CA', 'California'), ('CO', 'Colorado'), ('CT', 'Connecticut'), ('DC', 'District of Columbia'), ('DE', 'Delaware'), ('FL', 'Florida'), ('GA', 'Georgia'), ('GU', 'Guam'), ('HI', 'Hawaii'), ('IA', 'Iowa'), ('ID', 'Idaho'), ('IL', 'Illinois'), ('IN', 'Indiana'), ('KS', 'Kansas'), ('KY', 'Kentucky'), ('LA', 'Louisiana'), ('MA', 'Massachusetts'), ('MD', 'Maryland'), ('ME', 'Maine'), ('MI', 'Michigan'), ('MN', 'Minnesota'), ('MO', 'Missouri'), ('MS', 'Mississippi'), ('MT', 'Montana'), ('NC', 'North Carolina'), ('ND', 'North Dakota'), ('NE', 'Nebraska'), ('NH', 'New Hampshire'), ('NJ', 'New Jersey'), ('NM', 'New Mexico'), ('NV', 'Nevada'), ('NY', 'New York'), ('OH', 'Ohio'), ('OK', 'Oklahoma'), ('OR', 'Oregon'), ('PA', 'Pennsylvania'), ('PR', 'Puerto Rico'), ('RI', 'Rhode Island'), ('SC', 'South Carolina'), ('SD', 'South Dakota'), ('TN', 'Tennessee'), ('TX', 'Texas'), ('UT', 'Utah'), ('VA', 'Virginia'), ('VI', 'Virgin Islands'), ('VT', 'Vermont'), ('WA', 'Washington'), ('WI', 'Wisconsin'), ('WV', 'West Virginia'), ('WY', 'Wyoming')], default='AK', max_length=2)),
                ('license_number', models.CharField(blank=True, max_length=20, null=True)),
                ('vin_number', models.CharField(max_length=20, null=True)),
                ('fuel_type', models.CharField(choices=[('di', 'Diesel'), ('ga', 'Gasoline'), ('pr', 'Propane'), ('li', 'Liquid Natural Gas'), ('co', 'Compressed Natural Gas'), ('me', 'Methanol'), ('e', 'E-85'), ('m', 'M-85'), ('a', 'A55'), ('bi', 'Biodisel'), ('o', 'Other')], default='di', max_length=2)),
                ('eld_device', models.CharField(max_length=16, null=True)),
                ('notes', models.CharField(blank=True, max_length=255, null=True)),
                ('is_active', models.BooleanField(default=1)),
                ('driver', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.driver')),
            ],
        ),
        migrations.CreateModel(
            name='Elog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('OFF', 'OFF'), ('SB', 'SB'), ('DR', 'DR'), ('ON', 'ON'), ('YM', 'YM'), ('PC', 'PC'), ('LIN', 'LOGIN'), ('LOU', 'LOGOUT'), ('POF', 'POWER OFF'), ('PON', 'POWER ON'), ('CER', 'CERTIFY'), ('INT', 'INTERMEDIATE')], default='OFF', max_length=3)),
                ('date', models.DateField()),
                ('time', models.TimeField()),
                ('location', models.CharField(blank=True, max_length=50, null=True)),
                ('lat', models.DecimalField(blank=True, decimal_places=9, max_digits=12, null=True)),
                ('lng', models.DecimalField(blank=True, decimal_places=9, max_digits=12, null=True)),
                ('odometer', models.IntegerField(blank=True, null=True)),
                ('eng_hours', models.DecimalField(blank=True, decimal_places=1, max_digits=6, null=True)),
                ('notes', models.CharField(blank=True, max_length=20, null=True)),
                ('document', models.CharField(blank=True, max_length=20, null=True)),
                ('trailer', models.CharField(blank=True, max_length=20, null=True)),
                ('driver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.driver')),
                ('vehicle', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.vehicle')),
            ],
        ),
    ]