# Generated by Django 4.0.4 on 2022-10-17 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='log',
            name='bol_number',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
        migrations.AlterField(
            model_name='log',
            name='note',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]