# Generated by Django 4.1.4 on 2023-02-16 09:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='editload',
            name='carrier',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.carrier'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='load',
            name='carrier',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.carrier'),
            preserve_default=False,
        ),
    ]
