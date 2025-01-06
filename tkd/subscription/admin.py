from django.contrib import admin
from .models import SubscriptionPlan, Subscription
# Register your models here.

admin.site.register(Subscription)
admin.site.register(SubscriptionPlan)


