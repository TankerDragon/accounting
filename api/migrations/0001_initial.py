# Generated by Django 4.0.4 on 2022-11-03 12:27

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
                ('target_name', models.CharField(choices=[('dri', 'driver'), ('use', 'user'), ('gro', 'gross'), ('lin', 'invite link')], max_length=3)),
                ('time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Driver',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('d_budget', models.DecimalField(decimal_places=2, default=0, max_digits=9)),
                ('l_budget', models.DecimalField(decimal_places=2, default=0, max_digits=9)),
                ('r_budget', models.DecimalField(decimal_places=2, default=0, max_digits=9)),
                ('first_name', models.CharField(max_length=20)),
                ('last_name', models.CharField(max_length=20)),
                ('driver_type', models.CharField(choices=[('O88', 'Owner operator - 88%'), ('O85', 'Owner operator - 85%'), ('C30', 'Company driver - 30%'), ('C35', 'Company driver - 35%'), ('L', 'Lease operator'), ('R', 'Rental operator')], max_length=3)),
                ('gross_target', models.DecimalField(decimal_places=2, default=10000.0, max_digits=9)),
                ('is_active', models.BooleanField(default=1)),
            ],
        ),
        migrations.CreateModel(
            name='Log',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('original_rate', models.DecimalField(decimal_places=2, max_digits=9)),
                ('current_rate', models.DecimalField(decimal_places=2, max_digits=9)),
                ('change', models.DecimalField(decimal_places=2, max_digits=9)),
                ('total_miles', models.IntegerField()),
                ('budget_type', models.CharField(choices=[('D', 'driver'), ('L', 'lane'), ('R', 'recovery')], max_length=1)),
                ('autobooker', models.BooleanField(default=False)),
                ('bol_number', models.CharField(max_length=32)),
                ('carrier', models.CharField(max_length=32)),
                ('pcs_number', models.CharField(max_length=16)),
                ('trailer', models.CharField(blank=True, max_length=16)),
                ('truck', models.CharField(blank=True, max_length=16)),
                ('status', models.CharField(choices=[('CO', 'Covered'), ('SO', 'Sold'), ('TO', 'Tonu'), ('RJ', 'Rejected'), ('RM', 'Removed')], max_length=2)),
                ('origin', models.CharField(max_length=128)),
                ('origin_state', models.CharField(choices=[('AK', 'Alaska'), ('AL', 'Alabama'), ('AR', 'Arkansas'), ('AS', 'American Samoa'), ('AZ', 'Arizona'), ('CA', 'California'), ('CO', 'Colorado'), ('CT', 'Connecticut'), ('DC', 'District of Columbia'), ('DE', 'Delaware'), ('FL', 'Florida'), ('GA', 'Georgia'), ('GU', 'Guam'), ('HI', 'Hawaii'), ('IA', 'Iowa'), ('ID', 'Idaho'), ('IL', 'Illinois'), ('IN', 'Indiana'), ('KS', 'Kansas'), ('KY', 'Kentucky'), ('LA', 'Louisiana'), ('MA', 'Massachusetts'), ('MD', 'Maryland'), ('ME', 'Maine'), ('MI', 'Michigan'), ('MN', 'Minnesota'), ('MO', 'Missouri'), ('MS', 'Mississippi'), ('MT', 'Montana'), ('NC', 'North Carolina'), ('ND', 'North Dakota'), ('NE', 'Nebraska'), ('NH', 'New Hampshire'), ('NJ', 'New Jersey'), ('NM', 'New Mexico'), ('NV', 'Nevada'), ('NY', 'New York'), ('OH', 'Ohio'), ('OK', 'Oklahoma'), ('OR', 'Oregon'), ('PA', 'Pennsylvania'), ('PR', 'Puerto Rico'), ('RI', 'Rhode Island'), ('SC', 'South Carolina'), ('SD', 'South Dakota'), ('TN', 'Tennessee'), ('TX', 'Texas'), ('UT', 'Utah'), ('VA', 'Virginia'), ('VI', 'Virgin Islands'), ('VT', 'Vermont'), ('WA', 'Washington'), ('WI', 'Wisconsin'), ('WV', 'West Virginia'), ('WY', 'Wyoming')], max_length=2)),
                ('destination', models.CharField(max_length=128)),
                ('destination_state', models.CharField(choices=[('AK', 'Alaska'), ('AL', 'Alabama'), ('AR', 'Arkansas'), ('AS', 'American Samoa'), ('AZ', 'Arizona'), ('CA', 'California'), ('CO', 'Colorado'), ('CT', 'Connecticut'), ('DC', 'District of Columbia'), ('DE', 'Delaware'), ('FL', 'Florida'), ('GA', 'Georgia'), ('GU', 'Guam'), ('HI', 'Hawaii'), ('IA', 'Iowa'), ('ID', 'Idaho'), ('IL', 'Illinois'), ('IN', 'Indiana'), ('KS', 'Kansas'), ('KY', 'Kentucky'), ('LA', 'Louisiana'), ('MA', 'Massachusetts'), ('MD', 'Maryland'), ('ME', 'Maine'), ('MI', 'Michigan'), ('MN', 'Minnesota'), ('MO', 'Missouri'), ('MS', 'Mississippi'), ('MT', 'Montana'), ('NC', 'North Carolina'), ('ND', 'North Dakota'), ('NE', 'Nebraska'), ('NH', 'New Hampshire'), ('NJ', 'New Jersey'), ('NM', 'New Mexico'), ('NV', 'Nevada'), ('NY', 'New York'), ('OH', 'Ohio'), ('OK', 'Oklahoma'), ('OR', 'Oregon'), ('PA', 'Pennsylvania'), ('PR', 'Puerto Rico'), ('RI', 'Rhode Island'), ('SC', 'South Carolina'), ('SD', 'South Dakota'), ('TN', 'Tennessee'), ('TX', 'Texas'), ('UT', 'Utah'), ('VA', 'Virginia'), ('VI', 'Virgin Islands'), ('VT', 'Vermont'), ('WA', 'Washington'), ('WI', 'Wisconsin'), ('WV', 'West Virginia'), ('WY', 'Wyoming')], max_length=2)),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('note', models.CharField(blank=True, max_length=100, null=True)),
                ('is_edited', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='LogEdit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now=True)),
                ('edited_log', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='edited', to='api.log')),
                ('original_log', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='original', to='api.log')),
            ],
        ),
    ]
