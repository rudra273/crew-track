from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, LoginView, LogoutView, UserProfileView

app_name = 'users'

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='auth_register'),
    path('auth/login/', LoginView.as_view(), name='auth_login'),
    path('auth/logout/', LogoutView.as_view(), name='auth_logout'),
    path('auth/refresh-token/', TokenRefreshView.as_view(), name='auth_refresh_token'),
    path('me/', UserProfileView.as_view(), name='auth_user_profile'),
]

