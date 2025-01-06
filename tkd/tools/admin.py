from django.contrib import admin
from .models import Tool, ToolCategory, ToolUsage
# Register your models here.


admin.site.register([Tool, ToolCategory, ToolUsage])