from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from users import urls as users_urls
from subscription import urls as subscription_urls
from tools import urls as tools_urls
from admin_app import urls as admin_urls
from pages import urls as pages_urls
urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/',include(users_urls)),
    path('tools/',include(tools_urls)),
    path('subscription/', include(subscription_urls)),
    path('iadmin/',include(admin_urls)),
    path('pages/',include(pages_urls))
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
