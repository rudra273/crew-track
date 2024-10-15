from django.db.models.signals import pre_save
from django.dispatch import receiver
from datetime import datetime
from .models import Company
import uuid
import re

@receiver(pre_save, sender=Company)
def set_company_id(sender, instance, **kwargs):
    if not instance.id:  # Check if the ID is not already set

        # Generate the ID with the current date in ddmmyy format
        date_part = datetime.now().strftime('%d%m%y')
        
        # Generate 4 random characters from a UUID
        random_chars = str(uuid.uuid4())
        random_letters = re.sub(r'[^a-zA-Z]', '', random_chars)
        random_chars = random_letters[:4]
        
        # Combine date and random characters
        instance.id = f"{date_part}{random_chars.upper()}"