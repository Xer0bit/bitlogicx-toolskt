from django.urls import path
from .views import *
urlpatterns = [
    path('get/<int:id>', SubscriptionView.as_view(), name='get_subscription_view'),
    path('post/', SubscriptionView.as_view(), name='post_subscription_view'),
    path('delete/<int:id>', SubscriptionView.as_view(), name='delete_subscription_view'),
    path('update/<int:id>', SubscriptionView.as_view(), name='update_subscription_view'),
    path('getall/', SubscriptionsView.as_view(), name='get_all_subscription_view'),
    path('plan/get/<int:id>', SubscriptionPlanView.as_view(), name='get_plan_view'),
    path('plan/post/', SubscriptionPlanView.as_view(), name='post_plan_view'),
    path('plan/delete/<int:id>', SubscriptionPlanView.as_view(), name='delete_plan_view'),
    path('plan/update/<int:id>', SubscriptionPlanView.as_view(), name='update_plan_view'),
    path('plans/getall/', SubscriptionPlansView.as_view(), name='get_all_plans_view'),
]
