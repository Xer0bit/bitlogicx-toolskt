from django.db import models
from tools.models import Tool
from tools.models import ToolCategory
class SingletonModel(models.Model):
    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        super(SingletonModel, self).save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

class AdminSetting(SingletonModel):
    homepage_tools = models.ManyToManyField(Tool)
    homepage_categories = models.ManyToManyField(ToolCategory)
    visits = models.BigIntegerField(default=0)
    total_signups = models.BigIntegerField(default=0)
    total_users = models.BigIntegerField(default=0)    
    total_pages = models.IntegerField(default=0)
    total_categories = models.IntegerField(default=0)
    total_tools = models.IntegerField(default=0)
    
    