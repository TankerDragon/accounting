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
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('drivers/', views.drivers),
    path('users/', views.users),
    path('carriers/', views.carriers),
    path('gross/', views.gross),

]