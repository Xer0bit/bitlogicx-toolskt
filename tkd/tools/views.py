from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import APIView, api_view
from django.shortcuts import get_object_or_404
from .models import Tool, ToolCategory, ToolUsage
from .serializers import ToolSerializer, ToolCategorySerializer, ToolUsageSerializer



class ToolView(APIView):
    def get(self, request, id):
        tool = get_object_or_404(Tool, id=id)
        serializer = ToolSerializer(tool, many=False)
        if serializer:
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    
    def post(self, request, *args, **kwargs):
        serializer = ToolSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    def delete(self, request, id):
        tool = get_object_or_404(Tool, pk = id)
        if tool:
            # os.remove(str(tool.image).split('/')[1])
            tool.delete()
            serializer = ToolSerializer(tool, many=False)
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, id):
        tool = get_object_or_404(Tool, id=id)
        if tool:
            tool.name = request.data['name']
            tool.category = get_object_or_404(ToolCategory, id=request.data['category'])
            tool.is_enabled = request.data['is_enabled']
            tool.free_limit = request.data['free_limit']
            tool.free_mb_limit = request.data['free_mb_limit']
            tool.save()
            serializer = ToolSerializer(tool, many=False)
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, id):
        tool = get_object_or_404(Tool, pk=id)
        print(tool)
        try:
            print(tool.is_enabled)
            tool.is_enabled = not tool.is_enabled  # Toggle the status
            tool.save()
            return Response(status.HTTP_200_OK)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
        
class ToolsView(APIView):
    def get(self, request):
        tools = Tool.objects.all()
        serializer = ToolSerializer(tools, many=True)
        if serializer:
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

class CategoryActiveToolsView(APIView):
    def get(self, request):
        tools = Tool.objects.filter(is_enabled=True)
        serializer = ToolSerializer(tools, many=True)
        if serializer:
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

class CategoryToolsView(APIView):
    def get(self, request, category):
        tools = Tool.objects.filter(category=category, is_enabled=True)
        serializer = ToolSerializer(tools, many=True)
        if serializer:
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    

class ToolUsageView(APIView):
    def get(self, request, id):
        tool_usage = get_object_or_404(ToolUsage, id = id)
        serializer = ToolUsageSerializer(tool_usage, many=False)
        if serializer:
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(status.HTTP_400_BAD_REQUEST)
    
    def post(self, request):
        tool_usage = ToolUsageSerializer(data = request.data, many=False)
        if tool_usage.is_valid():
            tool_usage.save()
            return Response(tool_usage.data, status.HTTP_200_OK)
        return Response(tool_usage.errors, status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        tool_usage = get_object_or_404(ToolUsage, id=id)
        if tool_usage:
            tool_usage.delete()
            serializer = ToolUsageSerializer(tool_usage, many=False)
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(status.HTTP_400_BAD_REQUEST)
    
class ToolsUsageView(APIView):
    def get(self, request):
        tools_usage = ToolUsage.objects.all()
        serializer = ToolUsageSerializer(tools_usage, many=True)
        if serializer:
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    
    
    
class ToolCategoryView(APIView):
    def get(self, request, id):
        tool_category = get_object_or_404(ToolCategory, id=id)
        serializer = ToolCategorySerializer(tool_category, many=False)
        if serializer:
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    
    def post(self, request):
        tool_category = ToolCategorySerializer(data = request.data, many=False)
        if tool_category.is_valid():
            tool_category.save()
            return Response(tool_category.data, status.HTTP_200_OK)
        return Response(tool_category.errors, status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, id):
        tool_category = get_object_or_404(ToolCategory, id=id)
        if tool_category:
            tool_category.name = request.data['name']
            tool_category.desc = request.data['desc']
            tool_category.save()
            serializer = ToolCategorySerializer(tool_category, many=False)
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

        
    def delete(self,request, id):
        try:
            tool_category = ToolCategory.objects.get(id=id)
            tool_category.delete()
            return Response(status=status.HTTP_200_OK)
        except ToolCategory.DoesNotExist:
            return Response({'error': 'ToolCategory not found'}, status=status.HTTP_404_NOT_FOUND)
    
    
class ToolCategoriesView(APIView):
    def get(self, request):
        tool_categories = ToolCategory.objects.all()
        serializer = ToolCategorySerializer(tool_categories, many=True)
        if serializer:
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)



#All Tools Code will be written here.
from rest_framework.parsers import MultiPartParser, FormParser
import base64
from io import BytesIO
from rembg import remove
from PIL import Image

class RemoveImageBackgroundTool(APIView):
    
    parser_classes = (MultiPartParser, FormParser)
    
    def post(self, request):
        image_file = request.FILES['image']
        if image_file:
            image = Image.open(image_file)
            output = remove(image)
            buffer = BytesIO()
            output.save(buffer, format='PNG')
            buffer.seek(0)
            encoded_image = base64.b64encode(buffer.read()).decode('utf-8')
            return Response(status=status.HTTP_200_OK, data=encoded_image, content_type='image/png')
        return Response(status=status.HTTP_400_BAD_REQUEST, message="Image not found")

        
class JpgToPngTool(APIView):
    
    parser_classes = (MultiPartParser, FormParser)
    
    def post(self, request):
        image_file = request.FILES['image']
        if image_file:
            image = Image.open(image_file)
            buffer = BytesIO()
            image.save(buffer, format='PNG')
            buffer.seek(0)
            encoded_image = base64.b64encode(buffer.read()).decode('utf-8')
            return Response(status=status.HTTP_200_OK, data=encoded_image, content_type='image/png')
        return Response(status=status.HTTP_400_BAD_REQUEST, message="Image not found")
    
class PngToJpegTool(APIView):
    parser_classes = (MultiPartParser, FormParser)
    
    def post(self, request):
        try:
            image_file = request.FILES.get('image')
            if image_file:
                image = Image.open(image_file)
                buffer = BytesIO()
                # Convert PNG to JPEG
                image.convert('RGB').save(buffer, format='JPEG')
                buffer.seek(0)
                # Encode to base64
                encoded_image = base64.b64encode(buffer.read()).decode('utf-8')
                return Response(data={'encoded_image': encoded_image}, status=status.HTTP_200_OK)
            else:
                return Response(data={'message': 'Image not found'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(data={'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




import io
from django.http import FileResponse
from rest_framework.parsers import JSONParser
from gtts import gTTS
class TextToAudioTool(APIView):
    parser_classes = [JSONParser]
    
    def post(self, request):
        text = request.data.get('text', '')
        if not text:
            return Response({'message': 'Text field is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Generate audio using gTTS
        tts = gTTS(text)
        
        # Create a BytesIO object to store the audio
        fp = io.BytesIO()
        tts.write_to_fp(fp)
        fp.seek(0)
        # Create a FileResponse object to send the audio file
        response = FileResponse(fp, as_attachment=True, filename='audio.mp3')
        response['Content-Type'] = 'audio/mpeg'
        response['Content-Disposition'] = 'attachment; filename="audio.mp3"'
    

        return response
    

import os
import tempfile
from pdf2docx import Converter
from django.http import HttpResponse
from django.core.files.storage import FileSystemStorage
from django.conf import settings

class PdfToWordTool(APIView):
    def post(self, request):
        pdf_file = request.FILES['pdf']

        # Create a temporary directory within the base path component
        with tempfile.TemporaryDirectory(dir=settings.MEDIA_ROOT) as temp_dir:
            # Save the uploaded PDF file to the temporary directory
            temp_pdf_file_path = os.path.join(temp_dir, 'temp.pdf')
            with open(temp_pdf_file_path, 'wb+') as f:
                f.write(pdf_file.read())

            # Convert PDF to DOCX
            word_file_io = io.BytesIO()
            cv = Converter(temp_pdf_file_path)
            cv.convert(word_file_io)
            cv.close()

            # Ensure the cursor is at the beginning of the BytesIO object
            word_file_io.seek(0)

            # Return the generated Word document in the response
            response = HttpResponse(word_file_io.read(), content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
            response['Content-Disposition'] = 'attachment; filename="converted-document.docx"'
            return response
        
        
from datetime import datetime
import pytz

class TimeConverterTool(APIView):
    
    def get(self, request):
        timezones = pytz.all_timezones
        return Response({'timezones': timezones})

    def post(self, request):
        time_str = request.data['time']
        from_zone = request.data['from_zone']
        to_zone = request.data['to_zone']
        
        print(time_str)
        
        if not time_str or not from_zone or not to_zone:
            return Response({"error": "Invalid parameters"}, status.HTTP_400_BAD_REQUEST)
        try:
            from_zone_tz = pytz.timezone(from_zone)
            to_zone_tz = pytz.timezone(to_zone)
        except pytz.UnknownTimeZoneError:
            return Response({"error": "Unknown timezone"}, status.HTTP_400_BAD_REQUEST)
        
        naive_time = datetime.strptime(time_str, '%I:%M %p')
        from_time = from_zone_tz.localize(naive_time)
        to_time = from_time.astimezone(to_zone_tz)
        converted_time_str = to_time.strftime('%I:%M %p')

        return Response({"converted_time": converted_time_str},status.HTTP_200_OK)
    
    
import xmltodict
import json

class XmlToJsonTool(APIView):
    
    def post(self, request):
        xml_data = request.data.get('xml')
        try:
            # Convert XML to dictionary
            data_dict = xmltodict.parse(xml_data)
            # Convert dictionary to JSON
            json_data = json.dumps(data_dict, indent=4)
            return Response(json_data, content_type='application/json', status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'POST request required'}, status=status.HTTP_400_BAD_REQUEST)

import json
import dicttoxml

class JsonToXmlTool(APIView):
    
    def post(self, request):
        json_data = request.data.get('json')
        try:
            # Convert JSON string to dictionary
            data_dict = json.loads(json_data)
            # Convert dictionary to XML
            xml_data = dicttoxml.dicttoxml(data_dict, custom_root='root', attr_type=False)
            return Response(xml_data, content_type='application/xml', status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


import numpy as np
import pytesseract
import cv2
from io import BytesIO

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'


class ImageToTextTool(APIView):
    def post(self, request):
        image_file = request.FILES['image']
        if image_file:
            # Read the uploaded file into a numpy array
            image_array = np.frombuffer(image_file.read(), np.uint8)
            # Create a BytesIO object to hold the image data
            image_stream = BytesIO(image_array)
            # Read the image data from the BytesIO object
            image = cv2.imdecode(np.frombuffer(image_stream.read(), np.uint8), cv2.IMREAD_COLOR)
            gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            extracted_text = pytesseract.image_to_string(gray_image)
            return Response(extracted_text, status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
import whois
class DomainAgeCheckerTool(APIView):
    def post(self, request, *args, **kwargs):
        domains = request.data.get('domains', '')
        domain_list = [domain.strip() for domain in domains.split('\n') if domain.strip()]
        results = []

        for domain in domain_list:
            result = self.get_domain_details(domain)
            results.append(result)

        return Response({'results': results}, status=status.HTTP_200_OK)

    def get_domain_details(self, domain):
        try:
            w = whois.whois(domain)
            creation_date = w.creation_date
            expiry_date = w.expiration_date

            if isinstance(creation_date, list):
                creation_date = creation_date[0]
            if isinstance(expiry_date, list):
                expiry_date = expiry_date[0]

            age = (datetime.now() - creation_date).days // 365

            return {
                'domain': domain,
                'creation_date': creation_date.strftime('%Y-%m-%d'),
                'expiry_date': expiry_date.strftime('%Y-%m-%d') if expiry_date else 'N/A',
                'age': age
            }
        except Exception as e:
            return {
                'domain': domain,
                'creation_date': 'N/A',
                'expiry_date': 'N/A',
                'age': 'N/A'
            }
            
            

import random
from PyDictionary import PyDictionary

class DomainNameSearchTool(APIView):

    def post(self, request, *args, **kwargs):
        data = request.data
        domain = data.get('domain')

        if not domain:
            return Response({'status': 'error', 'message': 'Domain is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Check domain availability
            try:
                w = whois.whois(domain)
                domain_status = 'available' if w.status is None else 'unavailable'
            except Exception as e:
                return Response({'status': 'error', 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            if domain_status == 'available':
                return Response({'status': 'available', 'domain': domain})
            else:
                # Generate and check alternative domains
                suggestions = self.generate_similar_domains(domain)
                available_domains = self.check_domains_availability(suggestions)

                return Response({
                    'status': 'unavailable',
                    'domain': domain,
                    'suggestions': available_domains
                })

        except json.JSONDecodeError:
            return Response({'status': 'error', 'message': 'Invalid JSON'}, status=status.HTTP_400_BAD_REQUEST)

    def generate_similar_domains(self, domain):
        base_name = domain.split('.')[0]
        tlds = ['.com', '.net', '.org', '.io', '.co', '.biz', '.info', '.us', '.uk', '.xyz']

        # List of common English words
        common_words = [
            'cloud', 'tech', 'data', 'app', 'web', 'site', 'link', 'code', 'start', 'smart', 
            'hub', 'world', 'zone', 'group', 'base', 'flow', 'next', 'space', 'city', 'link',
            'wave', 'node', 'build', 'edge', 'drive', 'plan', 'form', 'peak', 'rise', 'mark',
            'wave', 'net', 'byte', 'core', 'byte', 'chip', 'sync', 'wave', 'pulse', 'shift',
            'scale', 'test', 'link', 'buzz', 'grid', 'sync', 'mind', 'peak', 'edge', 'link',
            'map', 'link', 'code', 'sync', 'file', 'space', 'link', 'goal', 'data', 'trend',
            'core', 'link', 'move', 'step', 'live', 'frame', 'text', 'spot', 'game', 'shift',
            'form', 'flow', 'task', 'zone', 'code', 'node', 'plug', 'path', 'shift', 'byte',
            'check', 'field', 'mark', 'team', 'plan', 'view', 'data', 'key', 'base', 'task',
            'core', 'zone', 'cloud', 'task', 'code', 'point', 'edge', 'view', 'map', 'team',
            'map', 'task', 'base', 'sync', 'team', 'task', 'plan', 'view', 'track', 'spot',
            'move', 'data', 'view', 'edge', 'click', 'task', 'path', 'team', 'wave', 'site',
            'goal', 'text', 'buzz', 'test', 'file', 'wave', 'link', 'cloud', 'node', 'step',
            'flow', 'trend', 'path', 'buzz', 'chip', 'peak', 'sync', 'spot', 'goal', 'pulse',
            'rise', 'byte', 'plan', 'link', 'sync', 'team', 'core', 'text', 'map', 'buzz','app', 'base', 'build', 'buzz', 'byte', 'chip', 'city', 'cloud', 'code', 'core',
    'data', 'drive', 'edge', 'file', 'flow', 'form', 'frame', 'game', 'goal', 'grid',
    'group', 'hub', 'key', 'link', 'live', 'map', 'mark', 'mind', 'move', 'net', 'next',
    'node', 'path', 'peak', 'plan', 'plug', 'point', 'pulse', 'rise', 'scale', 'shift',
    'site', 'smart', 'space', 'spot', 'start', 'step', 'sync', 'task', 'team', 'tech',
    'test', 'text', 'trend', 'view', 'wave', 'web', 'world', 'zone', 'access', 'analytics',
    'architecture', 'artificial', 'automation'
        ]

        # Generate domain suggestions using synonyms
        dictionary = PyDictionary()
        synonyms = dictionary.synonym(base_name) or []
        suggestions = set()

        # Add synonyms to the suggestions
        for synonym in synonyms:
            for tld in tlds:
                suggestions.add(f"{synonym}{tld}")

        # Add some common words to the suggestions as well
        for _ in range(5):  # Generate 5 suggestions
            random_word = random.choice(common_words)
            suggestion = f"{base_name}{random_word}{random.choice(tlds)}"
            suggestions.add(suggestion)
        
        return list(suggestions)

    def check_domains_availability(self, domains):
        available_domains = []
        for domain in domains:
            try:
                w = whois.whois(domain)
                if w.status is None:
                    available_domains.append(domain)
            except Exception as e:
                # Handle domain checking errors (e.g., network issues)
                continue
        
        # Limit the number of available domains returned
        return available_domains[:5]


class UserIpTool(APIView):
    def get(self, request):
        # Get the IP address
        ip_address = request.META.get('HTTP_X_FORWARDED_FOR', request.META.get('REMOTE_ADDR'))
        return JsonResponse({'ip_address': ip_address})

class WaterMarkRemoverTool(APIView):
    def post(self, request):
        image_file = request.FILES['image']
        if image_file:
            img = Image.open(image_file)
            img_np = np.array(img)

            # Convert the image to LAB color space
            lab = cv2.cvtColor(img_np, cv2.COLOR_BGR2LAB)
            l, a, b = cv2.split(lab)

            # Apply CLAHE (Contrast Limited Adaptive Histogram Equalization) to the L channel
            clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
            cl = clahe.apply(l)

            # Merge the CLAHE enhanced L channel with the a and b channels
            limg = cv2.merge((cl, a, b))

            # Convert back to BGR color space
            enhanced_img = cv2.cvtColor(limg, cv2.COLOR_LAB2BGR)

            # Apply sharpening
            kernel = np.array([[0, -1, 0],
                               [-1, 5, -1],
                               [0, -1, 0]])
            sharpened_img = cv2.filter2D(enhanced_img, -1, kernel)

            # Apply denoising
            denoised_img = cv2.fastNlMeansDenoisingColored(sharpened_img, None, 10, 10, 7, 21)

            # Convert the resulting image back to PIL format
            final_img = Image.fromarray(cv2.cvtColor(denoised_img, cv2.COLOR_BGR2RGB))
            
            # Save the image to a buffer
            buffer = BytesIO()
            final_img.save(buffer, format='PNG')
            buffer.seek(0)
            encoded_image = base64.b64encode(buffer.read()).decode('utf-8')
            
            return Response(status=status.HTTP_200_OK, data={'image': encoded_image}, content_type='application/json')
        
        return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Image not found"})


from django.http import StreamingHttpResponse
from pytube import YouTube

class YouTubeDownloaderTool(APIView):
    def post(self, request):
        url = request.data.get('url')

        if not url:
            return Response({"message": "URL is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            yt = YouTube(url)
            stream = yt.streams.get_highest_resolution()

            # Download video to BytesIO
            buffer = BytesIO()
            stream.stream_to_buffer(buffer)
            buffer.seek(0)

            # Create a StreamingHttpResponse to send the video back to the client
            response = StreamingHttpResponse(buffer, content_type='video/mp4')
            response['Content-Disposition'] = f'attachment; filename="{yt.title}.mp4"'
            return response

        except Exception as e:
            # Improved error handling with logging and specific error messages
            print(f"Exception occurred: {e}")
            return Response({"message": f"An error occurred: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)



import webbrowser
class BulkURLOpenerTool(APIView):
    def post(self, request):
        urls = request.data.get('urls')
        if urls:
            url_list = urls.split()
            for url in url_list:
                webbrowser.open_new_tab(url)
        return Response({'message': 'URLs opened successfully'}, status=status.HTTP_200_OK)


# from django.http import FileResponse
# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# import io
# import validators

# class WebsiteScreenshotTool(APIView):
#     def post(self, request, *args, **kwargs):
#         url = request.data.get('url')
#         device_type = request.data.get('device_type')
#         page_type = request.data.get('page_type')

#         if not validators.url(url):
#             return Response({'error': 'Invalid URL. Please enter a valid URL starting with http:// or https://'}, status=status.HTTP_400_BAD_REQUEST)

#         screenshot = self.take_screenshot(url, device_type, page_type == 'fullpage')
#         if screenshot:
#             encoded_image = base64.b64encode(screenshot.getvalue()).decode('utf-8')
#             return Response({'screenshot': encoded_image}, status=status.HTTP_200_OK)
#         else:
#             return Response({'error': 'Failed to take screenshot. Please try again.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#     def take_screenshot(self, url, device_type, full_page):
#         options = webdriver.ChromeOptions()
#         options.add_argument('--headless')
#         options.add_argument('--no-sandbox')
#         options.add_argument('--disable-dev-shm-usage')

#         if device_type == 'mobile':
#             mobile_emulation = {
#                 "deviceName": "Nexus 5"
#             }
#             options.add_experimental_option("mobileEmulation", mobile_emulation)

#         service = Service('/usr/bin/chromedriver')
#         driver = webdriver.Chrome(service=service, options=options)

#         try:
#             driver.get(url)
#             driver.execute_script("document.body.style.overflow='hidden';")

#             if full_page:
#                 total_width = driver.execute_script("return document.body.scrollWidth")
#                 total_height = driver.execute_script("return document.body.scrollHeight")
#                 driver.set_window_size(total_width, total_height)
#             else:
#                 if device_type == 'mobile':
#                     viewport_width = 360  # Default width for Nexus 5
#                     viewport_height = 640  # Default height for Nexus 5
#                     driver.set_window_size(viewport_width, viewport_height)
#                 else:
#                     viewport_width = driver.execute_script("return window.innerWidth")
#                     viewport_height = driver.execute_script("return window.innerHeight")
#                     driver.set_window_size(viewport_width, viewport_height)

#             screenshot = io.BytesIO()
#             screenshot.write(driver.get_screenshot_as_png())
#             screenshot.seek(0)
#         except Exception as e:
#             print(f"Error taking screenshot: {e}")
#             screenshot = None
#         finally:
#             driver.quit()

#         return screenshot

import dns.resolver
import dns.reversename
class DomainHostingCheckerTool(APIView):

    def post(self, request, *args, **kwargs):
        domain_name = request.data.get('domain_name', '').strip()
        if not domain_name:
            return Response({'error': 'Domain name is required.'}, status=status.HTTP_400_BAD_REQUEST)

        result = self.check_domain_hosting(domain_name)
        return Response(result, status=status.HTTP_200_OK)

    def check_domain_hosting(self, domain_name):
        try:
            # Perform DNS lookup to get the IP address
            answers = dns.resolver.resolve(domain_name, 'A')
            ip_address = answers[0].to_text()

            # Perform reverse DNS lookup to get PTR record
            try:
                reverse_name = dns.reversename.from_address(ip_address)
                ptr_record = dns.resolver.resolve(reverse_name, 'PTR')[0].to_text()
            except dns.resolver.NXDOMAIN:
                ptr_record = 'No PTR record found'

            # Get WHOIS data (for nameservers)
            w = whois.whois(domain_name)
            nameservers = w.name_servers if w.name_servers else 'No nameservers found'

            return {
                'domain_name': domain_name,
                'ip_address': ip_address,
                'hosting_provider': ptr_record,
                'nameservers': nameservers,
                'status': 'success'
            }
        except dns.resolver.NXDOMAIN:
            return {
                'domain_name': domain_name,
                'status': 'error',
                'message': 'Domain does not exist.'
            }
        except dns.resolver.NoAnswer:
            return {
                'domain_name': domain_name,
                'status': 'error',
                'message': 'No answer received from DNS query.'
            }
        except dns.resolver.Timeout:
            return {
                'domain_name': domain_name,
                'status': 'error',
                'message': 'DNS query timed out.'
            }
        except Exception as e:
            return {
                'domain_name': domain_name,
                'status': 'error',
                'message': str(e)
            }
   
   
            
import socket    
class DomainIpCheckerTool(APIView):

    def post(self, request):
        domain = request.data.get('domain', '').strip()
        if not domain:
            return Response({'error': 'Domain is required.'}, status=status.HTTP_400_BAD_REQUEST)

        result = self.get_domain_ip_info(domain)
        if 'error' in result:
            return Response(result, status=status.HTTP_400_BAD_REQUEST)
        return Response(result, status=status.HTTP_200_OK)

    def get_domain_ip_info(self, domain):
        try:
            # Get IP address using socket library
            ip_address = socket.gethostbyname(domain)
            
            # Get WHOIS information
            w = whois.whois(domain)
            country = w.country if w.country else 'N/A'
            hosting = w.org if w.org else 'N/A'
            
            return {
                'domain': domain,
                'ip_address': ip_address,
                'country': country,
                'hosting': hosting
            }
        except socket.gaierror as e:
            return {
                'domain': domain,
                'error': f"Error resolving domain: {str(e)}"
            }
        except Exception as e:
            return {
                'domain': domain,
                'error': str(e)
            }            




class FindDNSRecordTool(APIView):

    def post(self, request, *args, **kwargs):
        domain_name = request.data.get('domain_name', '').strip()
        if not domain_name:
            return Response({'error': 'Domain name is required.'}, status=status.HTTP_400_BAD_REQUEST)

        result = self.get_dns_records(domain_name)
        return Response(result, status=status.HTTP_200_OK)

    def get_dns_records(self, domain_name):
        try:
            records = []
            answers = dns.resolver.resolve(domain_name, 'A')
            for rdata in answers:
                records.append({
                    'host': domain_name,
                    'ip_address': rdata.address,
                    'class': 'IN',
                    'ttl': answers.rrset.ttl,
                    'type': 'A'
                })
            return {
                'domain_name': domain_name,
                'status': 'success',
                'records': records
            }
        except dns.resolver.NoAnswer:
            return {
                'domain_name': domain_name,
                'status': 'error',
                'message': 'No DNS records found for this domain.'
            }
        except dns.resolver.NXDOMAIN:
            return {
                'domain_name': domain_name,
                'status': 'error',
                'message': 'Domain does not exist.'
            }
        except dns.resolver.Timeout:
            return {
                'domain_name': domain_name,
                'status': 'error',
                'message': 'DNS query timed out.'
            }
        except Exception as e:
            return {
                'domain_name': domain_name,
                'status': 'error',
                'message': str(e)
            }
            
            

import hashlib
import base64
import bcrypt
class HashGeneratorTool(APIView):

    def post(self, request, *args, **kwargs):
        original_text = request.data.get('original_text', '').strip()
        if not original_text:
            return Response({'error': 'Original text is required.'}, status=status.HTTP_400_BAD_REQUEST)

        result = self.generate_hashes(original_text)
        return Response(result, status=status.HTTP_200_OK)

    def generate_hashes(self, original_text):
        # MD5
        md5_hash = hashlib.md5(original_text.encode()).hexdigest()
        
        # Base64
        base64_hash = base64.b64encode(original_text.encode()).decode()

        # Bcrypt
        bcrypt_hash = bcrypt.hashpw(original_text.encode(), bcrypt.gensalt()).decode()

        # SHA1
        sha1_hash = hashlib.sha1(original_text.encode()).hexdigest()

        # SHA256
        sha256_hash = hashlib.sha256(original_text.encode()).hexdigest()

        return {
            'original_text': original_text,
            'md5': md5_hash,
            'base64': base64_hash,
            'bcrypt': bcrypt_hash,
            'sha1': sha1_hash,
            'sha256': sha256_hash
        }
        
        
        
class WordPressPasswordGeneratorTool(APIView):

    def post(self, request, *args, **kwargs):
        password = request.data.get('password', '').strip()
        if not password:
            return Response({'error': 'Password is required.'}, status=status.HTTP_400_BAD_REQUEST)

        hashed_password = self.generate_wordpress_hash(password)
        return Response({'password': password, 'hashed_password': hashed_password}, status=status.HTTP_200_OK)

    def generate_wordpress_hash(self, password):
        # WordPress uses a cost of 8 for bcrypt hashing
        salt = bcrypt.gensalt(rounds=8)
        hashed_password = bcrypt.hashpw(password.encode(), salt)
        return hashed_password.decode()
        
  
  
import re      
class PasswordStrengthCheckerTool(APIView):
    
    def post(self, request, *args, **kwargs):
        password = request.data.get('password', '').strip()
        if not password:
            return Response({'error': 'Password is required.'}, status=status.HTTP_400_BAD_REQUEST)

        result = self.check_password_strength(password)
        return Response(result, status=status.HTTP_200_OK)

    def check_password_strength(self, password):
        criteria = {
            'length': len(password) >= 8,
            'lowercase': re.search(r'[a-z]', password) is not None,
            'uppercase': re.search(r'[A-Z]', password) is not None,
            'number': re.search(r'[0-9]', password) is not None,
            'special': re.search(r'[!@#$%^&*]', password) is not None
        }

        strength = sum(criteria.values())
        strength_text = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'][strength - 1]

        return {
            'password': password,
            'criteria': criteria,
            'strength': strength_text
        }

import string
import random
class PasswordGeneratorTool(APIView):

    def post(self, request, *args, **kwargs):
        length = request.data.get('length')
        include_upper = request.data.get('include_upper', False)
        include_lower = request.data.get('include_lower', False)
        include_special = request.data.get('include_special', False)
        include_digits = request.data.get('include_digits', False)

        if not length:
            return Response({'error': 'Password length is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            length = int(length)
        except ValueError:
            return Response({'error': 'Password length must be an integer.'}, status=status.HTTP_400_BAD_REQUEST)

        if length < 1:
            return Response({'error': 'Password length must be greater than 0.'}, status=status.HTTP_400_BAD_REQUEST)

        characters = ''
        if include_upper:
            characters += string.ascii_uppercase
        if include_lower:
            characters += string.ascii_lowercase
        if include_special:
            characters += string.punctuation
        if include_digits:
            characters += string.digits

        if not characters:
            return Response({'error': 'At least one character type must be selected.'}, status=status.HTTP_400_BAD_REQUEST)

        password = ''.join(random.choice(characters) for _ in range(length))
        return Response({'password': password}, status=status.HTTP_200_OK)




# import speech_recognition as sr
# from pydub import AudioSegment
# from django.conf import settings

# class SpeechToTextTool(APIView):

#     def post(self, request, *args, **kwargs):
#         if 'audio' not in request.FILES:
#             return Response({'error': 'No audio file provided.'}, status=status.HTTP_400_BAD_REQUEST)
        
#         audio_file = request.FILES['audio']
#         file_path = os.path.join(settings.MEDIA_ROOT, audio_file.name)

#         with open(file_path, 'wb+') as destination:
#             for chunk in audio_file.chunks():
#                 destination.write(chunk)

#         recognizer = sr.Recognizer()

#         try:
#             audio = AudioSegment.from_file(file_path)
#             audio.export(file_path, format="wav")
            
#             with sr.AudioFile(file_path) as source:
#                 audio_data = recognizer.record(source)
#                 text = recognizer.recognize_google(audio_data)
            
#             os.remove(file_path)
#             return Response({'text': text})
#         except Exception as e:
#             os.remove(file_path)
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


from moviepy.editor import VideoFileClip
import logging

# Set up logging
logger = logging.getLogger(__name__)
class VideoToAudioTool(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        try:
            # Get the uploaded video file from the request
            uploaded_file = request.FILES.get('file')
            if not uploaded_file:
                logger.error("No file uploaded")
                return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

            # Save the uploaded video file temporarily in the media directory
            temp_video_file_path = os.path.join(settings.MEDIA_ROOT, uploaded_file.name)
            with open(temp_video_file_path, 'wb') as temp_video_file:
                for chunk in uploaded_file.chunks():
                    temp_video_file.write(chunk)

            # Extract audio from the video file
            video_clip = VideoFileClip(temp_video_file_path)
            temp_audio_file_path = os.path.join(settings.MEDIA_ROOT, 'converted-audio.mp3')
            video_clip.audio.write_audiofile(temp_audio_file_path)
            video_clip.close()

            # Read the audio file and return it in the response
            with open(temp_audio_file_path, 'rb') as f:
                audio_data = f.read()

            # Clean up temporary files
            os.remove(temp_video_file_path)
            os.remove(temp_audio_file_path)

            # Return the audio file as a response
            response = HttpResponse(audio_data, content_type='audio/mp3')
            response['Content-Disposition'] = 'attachment; filename="converted-audio.mp3"'
            return response

        except Exception as e:
            logger.error(f"Error processing video to audio: {str(e)}")
            return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


from moviepy.editor import VideoFileClip
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.core.files.storage import default_storage

class VideoCompressTool(APIView):
    parser_classes = (MultiPartParser, FormParser)

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        video = request.data.get('file')
        if not video:
            return Response({"error": "No video file provided."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Save the uploaded video to the media directory
            video_path = default_storage.save(video.name, video)
            full_video_path = os.path.join(settings.MEDIA_ROOT, video_path)

            # Load the video with moviepy
            clip = VideoFileClip(full_video_path)

            # Define the path for the compressed video
            compressed_filename = f"compressed_{video.name}"
            compressed_path = os.path.join(settings.MEDIA_ROOT, compressed_filename)

            # Compress the video
            clip.write_videofile(
                compressed_path,
                codec='libx264',
                bitrate="500k",  # Adjust this as needed
                audio_codec='aac'
            )

            # Check if the compressed file was created successfully
            if not os.path.exists(compressed_path):
                return Response({"error": "Compression failed, compressed video not created."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Generate a URL for the compressed video
            compressed_url = os.path.join(settings.MEDIA_URL, compressed_filename)

            # Clean up the original video
            os.remove(full_video_path)

            # Return the URL of the compressed video
            return Response({"compressed_video_url": compressed_url}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ImageCompressTool(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request):
        image_file = request.FILES.get('image')
        if image_file:
            try:
                # Open the image file
                image = Image.open(image_file)

                # Compress the image
                buffer = BytesIO()
                image.save(buffer, format='JPEG', quality=50)  # Compress and save as JPEG
                buffer.seek(0)

                # Encode the image to base64
                encoded_image = base64.b64encode(buffer.read()).decode('utf-8')

                # Return the base64 encoded image
                return Response({'encoded_image': encoded_image}, status=status.HTTP_200_OK)

            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'error': 'No image file provided.'}, status=status.HTTP_400_BAD_REQUEST)



import qrcode
class TextToQRCodeTool(APIView):
    def post(self, request, *args, **kwargs):
        text = request.data.get('text', '')

        if not text:
            return Response({'error': 'No text provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Generate QR code
            qr = qrcode.QRCode(version=1, box_size=10, border=4)
            qr.add_data(text)
            qr.make(fit=True)
            img = qr.make_image(fill='black', back_color='white')

            # Convert image to base64
            buffered = io.BytesIO()
            img.save(buffered, format="PNG")
            img_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')

            return Response({'qr_code': f'data:image/png;base64,{img_base64}'}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



import barcode
from django.core.files.base import ContentFile
import base64

class TextToBarcodeTool(APIView):
    def post(self, request, *args, **kwargs):
        text = request.data.get('text')

        if not text:
            return Response({'error': 'No text provided'}, status=400)

        # Generate the barcode
        code39 = barcode.get_barcode_class('code39')
        barcode_instance = code39(text, writer=barcode.writer.ImageWriter())
        buffer = BytesIO()
        barcode_instance.write(buffer)

        # Convert barcode image to base64
        base64_image = base64.b64encode(buffer.getvalue()).decode('utf-8')

        return Response({'barcode_image': base64_image})
  
  
  

import csv
import json

class CSVToJSONView(APIView):
    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        if not file:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)
        
        decoded_file = file.read().decode('utf-8').splitlines()
        reader = csv.DictReader(decoded_file)
        json_data = json.dumps([row for row in reader])

        response = HttpResponse(json_data, content_type='application/json')
        response['Content-Disposition'] = 'attachment; filename="converted_data.json"'

        return response

  
  
import json
import csv
from io import StringIO

class JSONToCSVView(APIView):
    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        if not file:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)
        
        json_data = json.loads(file.read().decode('utf-8'))
        if isinstance(json_data, dict):
            json_data = [json_data]
        
        if not json_data or not isinstance(json_data, list):
            return Response({"error": "Invalid JSON data"}, status=status.HTTP_400_BAD_REQUEST)

        csv_file = StringIO()
        csv_writer = csv.DictWriter(csv_file, fieldnames=json_data[0].keys())
        csv_writer.writeheader()
        csv_writer.writerows(json_data)
        csv_file.seek(0)
        
        response = HttpResponse(csv_file, content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="converted_data.csv"'

        return response
  
  

import requests
class WebsiteSpeedCheckerView(APIView):
    def post(self, request, *args, **kwargs):
        url = request.data.get('url')
        if not url:
            return Response({"error": "No URL provided"}, status=status.HTTP_204_NO_CONTENT)
        
        try:
            response = requests.get(url)
            load_time = response.elapsed.total_seconds()
            speed_info = {
                "url": url,
                "status": "success",
                "data": {
                    "load_time": f"{load_time} seconds",
                    "status_code": response.status_code,
                }
            }
            return Response(speed_info, status=status.HTTP_200_OK)
        except requests.RequestException as e:
            return Response({"error": str(e), "status": "failed"}, status=status.HTTP_400_BAD_REQUEST)
  


# tools/views.py
import ssl
import socket
from urllib.parse import urlparse

class CheckSSLView(APIView):
    def post(self, request, *args, **kwargs):
        url = request.data.get('url')
        if not url:
            return Response({"message": "URL is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            parsed_url = urlparse(url)
            hostname = parsed_url.hostname
            port = parsed_url.port or 443

            # Create a socket connection
            context = ssl.create_default_context()
            with socket.create_connection((hostname, port), timeout=10) as sock:
                with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                    cert = ssock.getpeercert()

            # Format certificate details
            def format_cert_details(cert):
                subject = dict(x[0] for x in cert.get('subject', []))
                issuer = dict(x[0] for x in cert.get('issuer', []))

                formatted_subject = f"Common Name: {subject.get('commonName', 'N/A')}"
                formatted_issuer = f"Organization: {issuer.get('organizationName', 'N/A')}, Country: {issuer.get('countryName', 'N/A')}"
                
                return formatted_subject, formatted_issuer

            subject, issuer = format_cert_details(cert)

            cert_info = {
                'subject': subject,
                'issuer': issuer,
                'version': cert.get('version'),
                'serialNumber': cert.get('serialNumber'),
                'notBefore': cert.get('notBefore'),
                'notAfter': cert.get('notAfter'),
            }

            return Response({"status": "success", "url": url, "data": cert_info})

        except Exception as e:
            return Response({"status": "error", "message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

  

class CheckUptimeView(APIView):
    def post(self, request, *args, **kwargs):
        url = request.data.get('url')
        if not url:
            return Response({"message": "URL is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                return Response({"status": "success", "message": "Website is up!"})
            else:
                return Response({"status": "error", "message": "Website is down or returned a non-200 status code."})
        except requests.RequestException as e:
            return Response({"status": "error", "message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



import markdown

class MarkdownToHtmlView(APIView):
    def post(self, request, *args, **kwargs):
        markdown_text = request.data.get('markdown')
        if not markdown_text:
            return Response({"message": "Markdown content is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            html_text = markdown.markdown(markdown_text)
            return Response({"html": html_text})
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
import html2text  
class HTMLToMarkdownView(APIView):
    def post(self, request, *args, **kwargs):
        html = request.data.get("html", "")
        if not html:
            return Response({"error": "HTML content is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Convert HTML to Markdown
            h = html2text.HTML2Text()
            h.ignore_links = False  # Set to True to ignore links
            markdown_text = h.handle(html)
            return Response({"markdown": markdown_text}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


from PIL import Image
import io
from colorthief import ColorThief
class ColorPaletteView(APIView):
    def post(self, request):
        print('0')

        image_file = request.FILES.get('image')

        if not image_file:
            return Response({"error": "Image file is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Read the image file into a BytesIO object
            image_bytes = io.BytesIO(image_file.read())
            image_file.seek(0)  # Reset file pointer for further use
            
            # Open the image using PIL
            image = Image.open(image_bytes)
            print('1')
            
            # Use the BytesIO object to create ColorThief
            color_thief = ColorThief(image_bytes)
            print('2')
            
            # Extract the color palette from the image
            palette = color_thief.get_palette(quality=1, color_count=6)
            print('3')
            
            # Convert colors to HEX format
            colors_hex = [f"#{color[0]:02x}{color[1]:02x}{color[2]:02x}" for color in palette]
            print('4')
            
            return Response({"colors": colors_hex}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




from io import BytesIO
from PIL import Image, ImageDraw, ImageFont
import base64
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class LogoMakerView(APIView):
    def post(self, request):
        text = request.data.get('text')
        shape = request.data.get('shape')
        icon = request.data.get('icon')

        if not text or not isinstance(text, str):
            return Response({"error": "Valid text is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Create a new image with white background
            img = Image.new('RGB', (300, 300), color='white')
            draw = ImageDraw.Draw(img)

            # Draw shape
            if shape == 'circle':
                draw.ellipse((50, 50, 250, 250), outline='black', width=2)
            elif shape == 'square':
                draw.rectangle((50, 50, 250, 250), outline='black', width=2)
            elif shape == 'triangle':
                draw.polygon([(150, 50), (50, 250), (250, 250)], outline='black', fill=None)

            # Draw text
            try:
                font = ImageFont.truetype("arial.ttf", size=20)  # Use a TrueType font
            except IOError:
                font = ImageFont.load_default()  # Fallback to default font

            text_bbox = draw.textbbox((0, 0), text, font=font)
            text_width = text_bbox[2] - text_bbox[0]
            text_height = text_bbox[3] - text_bbox[1]
            
            # Draw the text
            draw.text(((300 - text_width) / 2, (300 - text_height) / 2), text, fill='black', font=font)
            
            
            
            # Convert image to PNG and encode to base64
            buffer = BytesIO()
            img.save(buffer, format="PNG")
            buffer.seek(0)
            encoded_image = base64.b64encode(buffer.read()).decode('utf-8')
            return Response(status=status.HTTP_200_OK, data=encoded_image, content_type='image/png')
        except Exception as e:
            import traceback
            error_details = traceback.format_exc()
            return Response({"error": str(e), "details": error_details}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




from django.http import FileResponse
from PyPDF2 import PdfReader, PdfWriter
import io

class MergePDFsView(APIView):
    def post(self, request, *args, **kwargs):
        files = request.FILES.getlist('files')
        if not files:
            return Response({'error': 'No files provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        output = io.BytesIO()
        pdf_writer = PdfWriter()
        
        try:
            for file in files:
                pdf_reader = PdfReader(file)
                for page in pdf_reader.pages:
                    pdf_writer.add_page(page)
            
            pdf_writer.write(output)
            output.seek(0)
            
            response = FileResponse(output, as_attachment=True, filename='merged.pdf', content_type='application/pdf')
            return response
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
from PyPDF2 import PdfReader, PdfWriter
import io
import zipfile

class SplitPDFsView(APIView):
    def post(self, request, *args, **kwargs):
        files = request.FILES.getlist('files')
        page_range = request.data.get('page_range', '')

        if not files:
            return Response({'error': 'No files provided'}, status=status.HTTP_400_BAD_REQUEST)

        # Parse page range
        ranges = self.parse_page_range(page_range)
        if ranges is None:
            return Response({'error': 'Invalid page range format'}, status=status.HTTP_400_BAD_REQUEST)

        zip_buffer = io.BytesIO()
        with zipfile.ZipFile(zip_buffer, 'w') as zip_file:
            try:
                for file in files:
                    pdf_reader = PdfReader(file)
                    total_pages = len(pdf_reader.pages)
                    
                    # If more ranges than pages, adjust the ranges
                    if any(end > total_pages for start, end in ranges):
                        ranges = [(start, min(end, total_pages)) for start, end in ranges]

                    for start, end in ranges:
                        pdf_writer = PdfWriter()
                        for page_number in range(start - 1, end):
                            if page_number < total_pages:
                                pdf_writer.add_page(pdf_reader.pages[page_number])
                        # Save each split PDF to the zip file
                        split_pdf_buffer = io.BytesIO()
                        pdf_writer.write(split_pdf_buffer)
                        split_pdf_buffer.seek(0)
                        zip_file.writestr(f'split_{file.name}_{start}-{end}.pdf', split_pdf_buffer.read())
                
                zip_buffer.seek(0)
                response = HttpResponse(zip_buffer.getvalue(), content_type='application/zip')
                response['Content-Disposition'] = 'attachment; filename=splits.zip'
                return response

            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def parse_page_range(self, page_range):
        ranges = []
        parts = page_range.split(',')
        for part in parts:
            if '-' in part:
                start, end = part.split('-')
                try:
                    ranges.append((int(start), int(end)))
                except ValueError:
                    return None
            else:
                try:
                    num = int(part)
                    ranges.append((num, num))
                except ValueError:
                    return None
        return ranges


    







import pytz
from datetime import datetime
from django.utils.dateparse import parse_datetime

class TimeZoneListView(APIView):
    def get(self, request, *args, **kwargs):
        # Get all time zones
        timezones = pytz.all_timezones
        return Response({'timezones': timezones})


from datetime import datetime, timedelta
import pytz
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class TimezoneConverterView(APIView):
    def post(self, request):
        from_zone = request.data.get('from_zone')
        to_zone = request.data.get('to_zone')
        
        if not from_zone or not to_zone:
            return Response(
                {"error": "Both from_zone and to_zone parameters are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            from_timezone = pytz.timezone(from_zone)
            to_timezone = pytz.timezone(to_zone)
        except pytz.UnknownTimeZoneError:
            return Response(
                {"error": "Invalid timezone provided."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get today's date at 12 AM in the from_zone
        now = datetime.now(from_timezone)
        from_zone_datetime = from_timezone.localize(datetime(now.year, now.month, now.day, 0, 0, 0))

        # Convert the datetime to the to_zone
        to_zone_datetime = from_zone_datetime.astimezone(to_timezone)

        # Calculate the difference in hours and minutes
        from_time = from_zone_datetime.timetz()
        to_time = to_zone_datetime.timetz()

        from_minutes = from_time.hour * 60 + from_time.minute
        to_minutes = to_time.hour * 60 + to_time.minute

        # Calculate the time difference, considering wrap-around at midnight
        time_difference = (to_minutes - from_minutes) % 1440

        return Response({
            "from_zone_datetime": from_zone_datetime.isoformat(),
            "to_zone_datetime": to_zone_datetime.isoformat(),
            "time_difference_minutes": time_difference
        })








class PdfEditorTool(APIView):
    def post(self, request):
        return Response(status.HTTP_200_OK)
    
    
class DeleteVideoFileView(APIView):
    def post(self, request, *args, **kwargs):
        filename = self.kwargs.get('filename')
        filename = "compressed_" + filename
        file_path = os.path.join(settings.MEDIA_ROOT, filename)

        if os.path.exists(file_path):
            os.remove(file_path)
            return Response({'status': 'File deleted successfully'})
        return Response({'error': 'File not found'}, status=404)
    
    