from django.urls import path
from .views import (
    UserRegisterView, 
    UserDetailView,
)
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('auth/register/', UserRegisterView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path('me/', UserDetailView.as_view(), name='user-detail'),

#  JWT Refresh token URLs 
#   path('auth/refresh-token', TokenRefreshView.as_view(), name='token_refresh')
]