from rest_framework import serializers
from .models import Subscription, SubscriptionPlan


class SubscriptionSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source='user.email', read_only=True)
    plan_name = serializers.CharField(source='plan.name', read_only=True)

    class Meta:
        model = Subscription
        fields = ['id', 'user', 'plan', 'user_email', 'plan_name', 'end_date', 'is_active']
        
        
class SubscriptionPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = '__all__'