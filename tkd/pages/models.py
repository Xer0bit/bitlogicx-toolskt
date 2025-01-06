from django.db import models
from django.utils.text import slugify
from tools.models import Tool
# Create your models here.

class Page(models.Model):
    title = models.CharField(max_length=250, unique=True)
    content = models.TextField()
    slug = models.SlugField(max_length=250 ,unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(Page, self).save(*args, **kwargs)

    def __str__(self):
        return self.title
    