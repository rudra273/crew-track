from django.urls import path
from .views import CompanyCreateView, CompanyListView, CompanyDetailView

urlpatterns = [
    path('list', CompanyListView.as_view(), name='company-list'),
    path('create', CompanyCreateView.as_view(), name='company-create'),
    path('get/<int:pk>/', CompanyDetailView.as_view(), name='company-detail'),
]

