# Generated by Django 5.0.6 on 2024-07-22 08:02

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tools', '0004_toolcategory_tools_count'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tool',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='tools.toolcategory'),
        ),
    ]