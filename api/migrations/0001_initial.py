# Generated by Django 4.1 on 2022-08-29 22:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Driver',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('d_budget', models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=9, null=True)),
                ('l_budget', models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=9, null=True)),
                ('r_budget', models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=9, null=True)),
                ('s_budget', models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=9, null=True)),
                ('first_name', models.CharField(max_length=20, null=True)),
                ('last_name', models.CharField(max_length=20, null=True)),
                ('driver_type', models.CharField(choices=[('O88', 'Owner operator - 88%'), ('O85', 'Owner operator - 85%'), ('C30', 'Company driver - 30%'), ('C35', 'Company driver - 35%'), ('L**', 'Lease operator'), ('R**', 'Rental operator')], max_length=3)),
                ('gross_target', models.DecimalField(blank=True, decimal_places=2, default=10000.0, max_digits=9, null=True)),
                ('is_active', models.BooleanField(default=1)),
                ('dispatcher', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
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
                ('budget_type', models.CharField(choices=[('D', 'driver'), ('L', 'lane'), ('R', 'recovery'), ('S', 'dirilis')], max_length=1)),
                ('bol_number', models.CharField(blank=True, max_length=15)),
                ('pcs_number', models.CharField(blank=True, max_length=15)),
                ('user', models.CharField(max_length=20)),
                ('date', models.DateTimeField(null=True)),
                ('note', models.CharField(blank=True, max_length=100)),
                ('is_edited', models.BooleanField(default=False)),
                ('driver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.driver')),
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
