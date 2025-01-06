from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import APIView
from django.contrib.auth import get_user_model
from .serializers import SubscriptionSerializer
from django.shortcuts import get_object_or_404
from django.conf import settings
from .models import Subscription, SubscriptionPlan
from .serializers import SubscriptionSerializer, SubscriptionPlanSerializer

User = get_user_model()
# Create your views here.
class SubscriptionPlanView(APIView):
    def get(self, request, id):
        plan = get_object_or_404(SubscriptionPlan, id=id)
        serializer = SubscriptionPlanSerializer(plan, many=False)
        if serializer:
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    
    
    def post(self, request):
        plan = SubscriptionPlanSerializer(data=request.data, many=False)
        if plan.is_valid():
            plan.is_active = True
            plan.save()
            return Response(plan.data, status.HTTP_200_OK)
        return Response(plan.errors, status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        plan = get_object_or_404(SubscriptionPlan, id=id)
        if plan:
            plan.delete()
            serializer = SubscriptionPlanSerializer(plan)
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        plan = get_object_or_404(SubscriptionPlan, id=id)
        if plan:
            plan.name = request.data['name']
            plan.price = request.data['price']
            plan.description = request.data['description']
            plan.features = request.data['features']
            plan.duration = request.data['duration']
            plan.save()
            serializer = SubscriptionPlanSerializer(plan, many=False)
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(status.HTTP_400_BAD_REQUEST)

class SubscriptionPlansView(APIView):
    def get(self, request):
        plans = SubscriptionPlan.objects.all()
        serializer = SubscriptionPlanSerializer(plans, many=True)
        if serializer:
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)        


class SubscriptionView(APIView):
    def get(self, request, id):
        subscription = get_object_or_404(Subscription, id=id)
        serializer = SubcriptionSerializer(subscription, many=False)
        if serializer:
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    def post(self, request):
        try:
                id = request.data['user']
                user = get_object_or_404(User, pk=id)
                plan_id = request.data['plan']
                plan = get_object_or_404(SubscriptionPlan, id=plan_id)
                end_date = request.data['end_date']

                subscription = Subscription(
                    user=user,
                    plan=plan,
                    end_date=end_date,
                    is_active=True
                )
                subscription.save()

                user.is_pro = True
                user.save()

                serializer = SubscriptionSerializer(subscription)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(f"Error: {e}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, id):
        subscription = get_object_or_404(Subscription, id=id)
        if subscription:
            user = get_object_or_404(User, email=subscription.user)
            user.is_pro = False
            user.save()
            subscription.delete()
            serializer = SubscriptionSerializer(subscription, many=False)
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, id):
        subscription = get_object_or_404(Subscription, id=id)
        if subscription:
            plan = get_object_or_404(SubscriptionPlan, id=request.data['plan'])
            subscription.plan = plan
            subscription.end_date = request.data['end_date']
            subscription.is_active = request.data['is_active']
            subscription.save()
            serializer = SubscriptionSerializer(subscription, many=False)
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
                        
   
        
        
        
class SubscriptionsView(APIView):
    def get(self, request):
        subscription = Subscription.objects.all()
        serializer = SubscriptionSerializer(subscription, many=True)
        if serializer:
            serializer = SubscriptionSerializer(subscription, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)       