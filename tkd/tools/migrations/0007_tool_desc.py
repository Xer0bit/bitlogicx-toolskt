# Generated by Django 5.0.6 on 2024-07-24 06:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tools', '0006_tool_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='tool',
            name='desc',
            field=models.TextField(blank=True),
        ),
    ]