from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from users.views import get_csrf_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('tools/', include('tools.urls')),
    path('subscription/', include('subscription.urls')),  # Fixed path
    path('iadmin/', include('admin_app.urls')),  # Fixed path
    path('pages/', include('pages.urls')),  # Fixed path
    path('csrf/', get_csrf_token, name='csrf_token'),
    
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
