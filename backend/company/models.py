from django.db import models
from django.contrib.auth.models import User

class Company(models.Model):
    id = models.CharField(max_length=10, primary_key=True, unique=True, editable=False)  # Format: [131124] dd-mm-yy-uuidchars
    name = models.CharField(max_length=255)
    owner = models.CharField(max_length=255)
    company_type = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True, max_length=255)  # Accepts null and can be left blank
    since = models.DateField(null=True, blank=True)  # Accepts null and can be left blank
    employee_range = models.CharField(max_length=50, null=True, blank=True)   # Example: "10-50", "50-100", etc.

    # user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'companies'
