from django.db import models

class Company(models.Model):
    id = models.CharField(max_length=50, primary_key=True)  # Format: [131124] dd-mm-yy-hh-mm-ss-nn
    name = models.CharField(max_length=255)
    owner = models.CharField(max_length=255)
    company_type = models.CharField(max_length=255)
    description = models.TextField()
    since = models.DateField()
    employee_range = models.CharField(max_length=50)  # Example: "10-50", "50-100", etc.

    def __str__(self):
        return self.name
