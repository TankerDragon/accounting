from django.urls import path
from . import views

urlpatterns = [
    path('budget/', views.main),
    path('dispatchers/', views.getDispatchers),
    path('new-driver/', views.new_driver),
    path('new-dispatcher/', views.new_dispatcher),
    # path('test/<int:id>', views.test),
    # # path('users/', views.getUsers, name='users'),
    # path('drivers/', views.getDrivers, name='drivers'),
    # path('driver/<int:id>', views.updateDriver, name='driver'),
    # path('new-driver/', views.newDriver, name='new-driver'),
    # path('vehicles/', views.getVehicles, name='vehicles'),
    # path('vehicle/<int:id>', views.updateVehicle, name='vehicle'),
    # path('new-vehicle/', views.newVehicle, name='new-vehicle'),
    # path('logs/<int:id>/<date>', views.logs, name='log'),
]