from rest_framework.response import Response
from rest_framework.decorators import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import AdminSetting
from .serializers import SettingSerializer





class SettingsView(APIView):
    def get(self, request):
        setting = AdminSetting.objects.all()
        serializer = SettingSerializer(setting, many=False)
        if serializer:
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, id):
        setting = get_object_or_404(AdminSetting, id=id)
        if setting:
            setting.homepage_tools = request.data['homepage_tools']
            setting.homepage_categories = request.data['homepage_categories']
            setting.save()
            serializer = SettingSerializer(setting, many=False)
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(status.HTTP_400_BAD_REQUEST)