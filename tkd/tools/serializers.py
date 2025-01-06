from rest_framework import serializers
from .models import Tool,  ToolCategory, ToolUsage


class ToolSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tool
        fields = '__all__'

   
class ToolCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ToolCategory
        fields = '__all__'

class ToolUsageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToolUsage
        fields = '__all__'
        
        

class TimeConversionSerializer(serializers.Serializer):
    from_time = serializers.DictField(child=serializers.CharField())
    to_time = serializers.DictField(child=serializers.CharField())
    from_tz = serializers.CharField()
    to_tz = serializers.CharField()



 