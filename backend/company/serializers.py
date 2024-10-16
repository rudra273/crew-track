from rest_framework import serializers
from .models import Company
from django.contrib.auth.models import User


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name', 'owner', 'company_type', 'description', 'since', 'employee_range','user']
        extra_kwargs = {
            'id': {'read_only': True},  # Make ID read-only
        }


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    re_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 're_password']

    def validate(self, attrs):
        if attrs['password'] != attrs['re_password']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('re_password')  # Remove re_password from validated data
        user = User(**validated_data) 
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user

    
