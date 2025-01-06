# Generated by Django 5.0.6 on 2024-07-24 05:52

import tools.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tools', '0005_alter_tool_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='tool',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=tools.models.tool_image_upload_path),
        ),
    ]
