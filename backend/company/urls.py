from django.urls import path
from .views import CompanyCreateView, CompanyListView, CompanyDetailView

urlpatterns = [
    path('companies/', CompanyListView.as_view(), name='company-list'),
    path('company/', CompanyCreateView.as_view(), name='company-create'),
    path('companies/<int:pk>/', CompanyDetailView.as_view(), name='company-detail'),
]

