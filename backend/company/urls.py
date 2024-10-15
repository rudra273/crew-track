from django.urls import path
from .views import CompanyCreateView, CompanyListView

urlpatterns = [
    path('company/', CompanyListView.as_view(), name='company-list'),
    path('company/', CompanyCreateView.as_view(), name='company-create'),
]
