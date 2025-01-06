from django.db import models

from django.contrib.auth.models import AbstractUser

from django.conf import settings



class CustomUser(AbstractUser):
    username = models.CharField(max_length=150, unique=False, default='User')
    email = models.EmailField(max_length=100, unique=True)
    status=models.CharField(max_length=250, default="active")
    is_admin = models.BooleanField(default=False)
    is_pro = models.BooleanField(default=False)
    is_blocked = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self):
        
        return self.email
    
    
class BlockedUser(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    