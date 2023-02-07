from time import sleep
from api.models import Driver
# from accounting.celery import celery
from celery import shared_task

# @celery.task
@shared_task
def notify_customers(message):
    print('*** Sending 1000 messages....')
    print('***', message)
    # new_driver = Driver()
    # new_driver.first_name = "celery"
    # new_driver.last_name = "celery"
    # new_driver.driver_type = "R**"
    # new_driver.save()
    sleep(10)
    print('*** Emails were successfully sent!')