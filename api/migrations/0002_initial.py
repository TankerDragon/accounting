# Generated by Django 4.1.6 on 2023-02-07 09:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('api', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='load',
            name='dispatcher',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='load',
            name='driver',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.driver'),
        ),
        migrations.AddField(
            model_name='load',
            name='trailer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.trailer'),
        ),
        migrations.AddField(
            model_name='load',
            name='truck',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.vehicle'),
        ),
        migrations.AddField(
            model_name='load',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='editvehicle',
            name='driver',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.driver'),
        ),
        migrations.AddField(
            model_name='editvehicle',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='edit_vehicle_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='editvehicle',
            name='vehicle',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='edit_vehicle', to='api.vehicle'),
        ),
        migrations.AddField(
            model_name='edittrailer',
            name='trailer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='edit_trailer', to='api.trailer'),
        ),
        migrations.AddField(
            model_name='edittrailer',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='edit_trailer_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='editload',
            name='carrier',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.carrier'),
        ),
        migrations.AddField(
            model_name='editload',
            name='dispatcher',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='editload',
            name='driver',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.driver'),
        ),
        migrations.AddField(
            model_name='editload',
            name='load',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='edit_load', to='api.load'),
        ),
        migrations.AddField(
            model_name='editload',
            name='trailer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.trailer'),
        ),
        migrations.AddField(
            model_name='editload',
            name='truck',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.vehicle'),
        ),
        migrations.AddField(
            model_name='editload',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='edit_load_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='editdriver',
            name='dispatcher',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='editdriver',
            name='driver',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='edit_driver', to='api.driver'),
        ),
        migrations.AddField(
            model_name='editdriver',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='edit_driver_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='editcarrier',
            name='carrier',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.carrier'),
        ),
        migrations.AddField(
            model_name='editcarrier',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='driver',
            name='dispatcher',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='action',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]
