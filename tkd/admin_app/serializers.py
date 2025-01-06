from rest_framework import serializers
from .models import AdminSetting


class SettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminSetting
        fields = '__all__'

        