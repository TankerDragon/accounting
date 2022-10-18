# Generated by Django 4.0.4 on 2022-10-18 12:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_log_bol_number_alter_log_note'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='driver',
            name='s_budget',
        ),
        migrations.AlterField(
            model_name='driver',
            name='d_budget',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=9),
        ),
        migrations.AlterField(
            model_name='driver',
            name='l_budget',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=9),
        ),
        migrations.AlterField(
            model_name='driver',
            name='r_budget',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=9),
        ),
    ]
