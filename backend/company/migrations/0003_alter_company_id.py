# Generated by Django 5.1.2 on 2024-10-15 11:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("company", "0002_alter_company_description_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="company",
            name="id",
            field=models.CharField(
                editable=False,
                max_length=10,
                primary_key=True,
                serialize=False,
                unique=True,
            ),
        ),
    ]
