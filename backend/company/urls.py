from django.urls import path
from .views import CompanyCreateView, CompanyListView, CompanyDetailView

app_name = 'company'

urlpatterns = [
    path('create/', CompanyCreateView.as_view(), name='company-create'),
    path('list/', CompanyListView.as_view(), name='company-list'),
    path('<uuid:pk>/', CompanyDetailView.as_view(), name='company-detail'),
]

