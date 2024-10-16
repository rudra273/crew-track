# from django.db import models
# from django.contrib.auth.models import User

# class Company(models.Model):
#     id = models.CharField(max_length=10, primary_key=True, unique=True, editable=False)  # Format: [131124] dd-mm-yy-uuidchars
#     name = models.CharField(max_length=255)
#     owner = models.CharField(max_length=255)
#     company_type = models.CharField(max_length=255)
#     description = models.TextField(null=True, blank=True, max_length=255)  # Accepts null and can be left blank
#     since = models.DateField(null=True, blank=True)  # Accepts null and can be left blank
#     employee_range = models.CharField(max_length=50, null=True, blank=True)   # Example: "10-50", "50-100", etc.
#     user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)  # Set to null if the user is deleted
    

#     def __str__(self):
#         return self.name
    
#     class Meta:
#         db_table = 'companies'

from django.db import models
from django.contrib.auth.models import User
import uuid


class Company(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    owner = models.CharField(max_length=255)
    company_type = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True, max_length=1000)
    since = models.DateField(null=True, blank=True)
    employee_range = models.CharField(max_length=50, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='companies')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'companies'
        ordering = ['-created_at']
        verbose_name_plural = 'Companies'

