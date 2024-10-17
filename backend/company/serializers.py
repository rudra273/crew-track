# from rest_framework import serializers
# from .models import Company


# class CompanySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Company
#         fields = ['id', 'name', 'owner', 'company_type', 'description', 'since', 'employee_range','user']
#         extra_kwargs = {
#             'id': {'read_only': True}, 
#         }
 

from rest_framework import serializers
from .models import Company

class CompanySerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Company
        fields = ['id', 'name', 'owner', 'company_type', 'description', 'since', 'employee_range', 'user', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_name(self, value):
        if Company.objects.filter(name=value, user=self.context['request'].user).exists():
            raise serializers.ValidationError("You already have a company with this name.")
        return value