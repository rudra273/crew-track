from django.db.models.signals import pre_save
from django.dispatch import receiver
from datetime import datetime
from .models import Company

@receiver(pre_save, sender=Company)
def set_company_id(sender, instance, **kwargs):
    if not instance.id:  # Check if the ID is not already set
        # Generate the ID with the current date and time in ddmmyyhhmm format
        instance.id = datetime.now().strftime('%d%m%y%H%M')  # Current date and time