from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, BlockedUser

class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'username', 'is_admin', 'is_pro', 'is_blocked', 'status')
    search_fields = ('email', 'username')
    ordering = ('email',)
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('username',)}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'is_admin', 'is_pro', 'is_blocked')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2'),
        }),
    )

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(BlockedUser)