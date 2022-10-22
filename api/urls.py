from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from core.views import MyTokenObtainPairView

from django.urls import path
from . import views

urlpatterns = [
    path('test/', views.test),
    #
    path('register/', views.register),
    #
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('gross/', views.gross),
    path('drivers/', views.drivers),
    path('users/', views.users),
    path('drivers-board/<int:week_before>', views.drivers_board),
    path('edit-driver/<int:id>', views.edit_driver),
    path('edit-dispatcher/<int:id>', views.edit_dispatcher),
    # path('archive/<int:id>', views.driver_archive),
    path('edit-log/<int:id>', views.edit_log),
    path('archive/edits/<int:id>', views.archive_edits),
]