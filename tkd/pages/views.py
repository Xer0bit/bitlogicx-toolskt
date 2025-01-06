from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import APIView
from rest_framework.decorators import api_view
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Page
from .serializers import PageSerializer


class PageView(APIView):
    def get(self, request, id):
        page = get_object_or_404(Page, id=id)
        serializer = PageSerializer(page, many=False)
        if serializer.is_valid():
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    def post(self, request):
        page = PageSerializer(data=request.data)
        if page.is_valid():
            page.save()
            return Response(page.data,status.HTTP_200_OK)
        return Response(page.errors, status.HTTP_400_BAD_REQUEST)
    def delete(self, request, id):
        page = get_object_or_404(Page, id=id)
        if page:
            page.delete()
            return Response(status.HTTP_200_OK)
        return Response(status.HTTP_400_BAD_REQUEST)
    def put(self, request, id):
        page = get_object_or_404(Page, id=id)
        if page:
            page.title = request.data['title']
            page.content = request.data['content']
            page.save()
            return Response(page, status.HTTP_200_OK)
        return Response(status.HTTP_400_BAD_REQUEST)


class PagesView(APIView):
    def get(self, request):
        pages = Page.objects.all()
        serializer = PageSerializer(pages, many=True)
        if serializer:
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(status.HTTP_400_BAD_REQUEST)
        