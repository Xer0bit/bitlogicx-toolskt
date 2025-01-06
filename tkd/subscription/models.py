from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
# Create your models here.

class SubscriptionPlan(models.Model):
    name = models.TextField(max_length=50, default='pro')
    price = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    description = models.TextField(default='description')
    features = models.TextField(default='features')
    duration = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

class Subscription(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.CASCADE)
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)