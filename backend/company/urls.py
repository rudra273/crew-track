from django.urls import path
from .views import (
    CompanyCreateView, 
    CompanyListView,                 
    CompanyDetailView, 
    UserRegisterView, 
    UserDetailView,
)
# from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    
#   Company URLs
    path('list', CompanyListView.as_view(), name='company-list'),
    path('create/', CompanyCreateView.as_view(), name='company-create'),
    path('get/<int:pk>/', CompanyDetailView.as_view(), name='company-detail'),
    
#   User URLs
    path('register/', UserRegisterView.as_view(), name='register'),
    path('user/<int:user_id>/', UserDetailView.as_view(), name='user-detail'),
   

#    JWT token URLs
#    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),  
#    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh')
]


