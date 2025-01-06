from django.db import models
from django.conf import settings
import os
import uuid
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
# Create your models here.
def tool_image_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('tools', filename)


class ToolCategory(models.Model):
    name = models.CharField(max_length=250, unique=True)
    desc = models.TextField(blank=True)
    tools_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

class Tool(models.Model):
    name = models.CharField(max_length=250,unique=True)
    desc = models.TextField(blank=True)
    category = models.ForeignKey(ToolCategory, blank=True, on_delete=models.SET_NULL, null=True)
    slug = models.SlugField(max_length=250, unique=True, blank=True)
    is_enabled = models.BooleanField(default=True)
    free_limit = models.IntegerField(default=10)
    free_mb_limit = models.IntegerField(default=100)
    usage_count = models.IntegerField(default=0)
    image = models.ImageField(upload_to=tool_image_upload_path, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    def save(self, *args, **kwargs):
        if not self.pk:  
            category = self.category
            if category:
                category.tools_count = models.F('tools_count') + 1
                category.save(update_fields=['tools_count'])
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        category = self.category
        if category:
            category.tools_count = models.F('tools_count') - 1
            category.save(update_fields=['tools_count'])
        super().delete(*args, **kwargs)
    
    
class ToolUsage(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, blank=True, null=True)
    tool = models.OneToOneField(Tool, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    
    
