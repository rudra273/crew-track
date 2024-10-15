from django.urls import path
from .views import CompanyCreateView

urlpatterns = [
    path('company/', CompanyCreateView.as_view(), name='company-create'),
]
