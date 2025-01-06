from rest_framework import status
from rest_framework.decorators import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import CustomUser
from .serializers import UserSerializer
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .utils import decode_jwt_token
from django.contrib.auth.hashers import make_password, check_password
# Create your views here.

User = get_user_model()

# views.py
from django.contrib.auth import authenticate

class AdminLoginView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        
        user = authenticate(email=email, password=password)
        
        if user is not None and user.is_superuser:
            return Response({'isSuperUser': True}, status=status.HTTP_200_OK)
        return Response({'isSuperUser': False}, status=status.HTTP_401_UNAUTHORIZED)



class RegisterView(APIView):
    def post(self, request):
        email = request.data['email']
        if User.objects.filter(email=email).exists():
            return Response({'message': 'User already exists'}, status.HTTP_409_CONFLICT)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh' : str(refresh),
                'access' : str(refresh.access_token), 
            }, status= status.HTTP_200_OK)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

    

class CurrentUserView(APIView):
    
    
    def post(self, request, id):
       current_user = get_object_or_404(User, id=id)
       serializer = UserSerializer(current_user, many=False)
       if serializer:
           return Response(serializer.data, status.HTTP_200_OK)
       return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
   
   
class IsActiveView(APIView):
    def post(self, request, email):
        user = get_object_or_404(User, email=email)
        if user.is_active and user:
            user.is_active = False
            user.save()
            return Response({'message': 'User is active'}, status=status.HTTP_200_OK)
        elif user and not user.is_active:
            user.is_active = True
            user.save()
            return Response({'message': 'User is not active'}, status=status.HTTP_200_OK)
            return Response({'message': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)

   
class UsersView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
    
    
    def post(self, request):
        email = request.data.get('email')
        if User.objects.filter(email=email).exists():
            return Response({'message': 'User already exists'}, status=status.HTTP_409_CONFLICT)
        
        # Create a serializer instance with the request data
        serializer = UserSerializer(data=request.data)
        
        # Validate the serializer
        if serializer.is_valid():
            # Save the user, without yet handling the is_admin field
            user = serializer.save()
            
            # Handle the is_admin field directly
            is_admin = request.data.get('is_admin', False)
            if is_admin:
                user.is_superuser = True
            user.is_admin = is_admin
            user.save()

            return Response({
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'is_admin': user.is_admin
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = UserSerializer(user, data=request.data, partial=True)
        
        if serializer.is_valid():
            user = serializer.save()
            
            is_admin = request.data.get('is_admin', False)
            if is_admin:
                user.is_superuser = True
            user.is_admin = is_admin
            user.save()

            return Response({
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'is_admin': user.is_admin
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, email):
        print(email)
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        user.delete()
        return Response({'message': 'User deleted successfully'}, status=status.HTTP_200_OK)
    
    