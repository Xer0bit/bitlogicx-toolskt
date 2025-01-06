from django.urls import path
from .views import PageView, PagesView

urlpatterns = [
       path('get/', PageView.as_view(), name='get_page_view'),
       path('post/', PageView.as_view(), name='post_page_view'),
       path('delete/', PageView.as_view(), name='delete_page_view'),
       path('update/', PageView.as_view(), name='update_page_view'),
       path('getall/', PageView.as_view(), name='get_all_pages_view'),
]
