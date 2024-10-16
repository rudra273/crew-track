from django.urls import path
from .views import (
    UserRegisterView, 
    UserDetailView,
)
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('register/', UserRegisterView.as_view(), name='register'),
    path('user/<int:user_id>/', UserDetailView.as_view(), name='user-detail'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'), 
]