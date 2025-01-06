from django.urls import path
from .views import RegisterView, CurrentUserView, UsersView, IsActiveView, AdminLoginView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)



urlpatterns = [
    path('admin/login/', AdminLoginView.as_view(), name='admin-login'),
    path('register/', RegisterView.as_view(), name='user_register_view'),
    path('create/', UsersView.as_view(), name='user_create_view'),
    path('update/', UsersView.as_view(), name='user_update_view'),
    path('is_active/<str:email>', IsActiveView.as_view(), name='user_is_active_view'),
    path('delete/<str:email>', UsersView.as_view(), name='user_delete_view'),
    path('current/<str:id>', CurrentUserView.as_view(), name='current_user_view'),
    path('getall/',UsersView.as_view(), name='get_users_view'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
