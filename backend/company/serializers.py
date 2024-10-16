from rest_framework import serializers
from .models import Company


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name', 'owner', 'company_type', 'description', 'since', 'employee_range','user']
        extra_kwargs = {
            'id': {'read_only': True},  # Make ID read-only
        }



    
