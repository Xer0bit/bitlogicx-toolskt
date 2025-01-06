from django.urls import path
from .views import *
# from .views import ToolView, ToolsView, ToolUsageView
# from .views import ToolsUsageView, ToolCategoryView, ToolCategoriesView
# from .views import RemoveImageBackgroundTool, TimeConverterTool, JpgToPngTool, PngToJpegTool, TextToAudioTool, PdfToWordTool



urlpatterns = [
    
    
    path('get/<int:id>', ToolView.as_view(),name='get_tool_view'),
    path('post/', ToolView.as_view(),name='post_tool_view'),
    path('delete/<int:id>', ToolView.as_view(),name='delete_tool_view'),
    path('update/<int:id>', ToolView.as_view(),name='update_tool_view'),
    path('patch/<int:id>', ToolView.as_view(),name='patch_tool_view'),
    path('getall/', ToolsView.as_view(),name='get_all_tool_view'),
    path('getall/<int:category>', CategoryToolsView.as_view(),name='get_all_tool_view'),
    path('getall/active', CategoryActiveToolsView.as_view(),name='get_all_tool_view'),
    

    path('usage/get/<int:id>', ToolUsageView.as_view(),name='get_usage_view'),
    path('usage/post/', ToolUsageView.as_view(),name='post_usage_view'),
    path('usage/delete/<int:id>', ToolUsageView.as_view(),name='delete_usage_view'),
    path('usage/getall/', ToolUsageView.as_view(),name='get_all_usage_view'),
    path('category/get/<int:id>', ToolCategoryView.as_view(),name='get_category_view'),
    path('category/post/', ToolCategoryView.as_view(),name='post_category_view'),
    path('category/delete/<int:id>', ToolCategoryView.as_view(),name='delete_category_view'),
    path('category/update/<int:id>', ToolCategoryView.as_view(),name='update_category_view'),
    path('categories/getall/', ToolCategoriesView.as_view(),name='get_all_categories_view'),
    
    ##############################################
    
    path('remove-background/',RemoveImageBackgroundTool.as_view(),name="remove_background"),
    path('jpg-to-png/',JpgToPngTool.as_view(),name="jpg_to_png"),
    path('png-to-jpeg/',PngToJpegTool.as_view(),name="png_to_jpeg"),
    path('text-to-audio/',TextToAudioTool.as_view(),name="text_to_audio"),
    path('pdf-to-word/',PdfToWordTool.as_view(),name="pdf_to_word"),
    path('time-converter/',TimeConverterTool.as_view(),name="time_converter"),
    path('xml-to-json/',XmlToJsonTool.as_view(),name="xml_to_json"),
    path('json-to-xml/',JsonToXmlTool.as_view(),name="xml_to_json"),
    path('image-to-text/',ImageToTextTool.as_view(),name="image_to_text"),
    path('domain-age-checker/',DomainAgeCheckerTool.as_view(),name="domain_age_checker"),
    path('domain-name-search/',DomainNameSearchTool.as_view(),name="domain_name_search"),
    path('user-ip/',UserIpTool.as_view(),name="domain_name_search"),
    # path('watermark-remover/',WaterMarkRemoverTool.as_view(),name="water_mark_remover"),
    # path('youtube-downloader/',YouTubeDownloaderTool.as_view(),name="youtube_downloader"),
    # path('pdf-editor/',PdfEditorTool.as_view(),name="pdf_editor"),
    path('bulk-url-opener/',BulkURLOpenerTool.as_view(),name="bulk_url_opener"),
    path('domain-hosting-checker/',DomainHostingCheckerTool.as_view(),name="domain_hosting_checker"),
    path('domain-ip-checker/',DomainIpCheckerTool.as_view(),name="domain_ip_checker"),
    path('find-dns-record/',FindDNSRecordTool.as_view(),name="find_dns_record"),
    path('hash-generator/',HashGeneratorTool.as_view(),name="hash_generator"),
    path('wordpress-password-generator/',WordPressPasswordGeneratorTool.as_view(),name="wordpress_password_generator"),
    path('password-strength-checker/',PasswordStrengthCheckerTool.as_view(),name="password_strength_checker"),
    path('password-generator/',PasswordGeneratorTool.as_view(),name="password_genartor"),
    # path('speech-to-text/',SpeechToTextTool.as_view(),name="speech_to_text"),
    path('video-to-audio/',VideoToAudioTool.as_view(),name="video_to_audio"),
    path('video-compress/',VideoCompressTool.as_view(),name="video_compresser"),
    path('image-compress/',ImageCompressTool.as_view(),name="image_compresser"),
    path('text-to-qr/',TextToQRCodeTool.as_view(),name="text_to_qr"),
    path('text-to-barcode/',TextToBarcodeTool.as_view(),name="text_to_barcode"),
    path('convert-time/timezones/', TimeZoneListView.as_view(), name='timezone-list'),
    path('convert-time/', TimezoneConverterView.as_view(), name='time-conversion'),
    path('csv-to-json/', CSVToJSONView.as_view(), name='csv-to-json'),
    path('json-to-csv/', JSONToCSVView.as_view(), name='json-to-csv'),
    path('check-speed/', WebsiteSpeedCheckerView.as_view(), name='check-speed'),
    path('check-ssl/', CheckSSLView.as_view(), name='check_ssl'),
    path('check-uptime/', CheckUptimeView.as_view(), name='check-uptime'),
    path('markdown-to-html/', MarkdownToHtmlView.as_view(), name='markdown-to-html'),
    path('html-to-markdown/', HTMLToMarkdownView.as_view(), name='html-to-markdown'),
    path('color-palette/', ColorPaletteView.as_view(), name='color-palette'),
    path('logo-maker/', LogoMakerView.as_view(), name='logo_maker'),
    path('merge-pdfs/', MergePDFsView.as_view(), name='merge-pdfs'),
    path('split-pdfs/', SplitPDFsView.as_view(), name='split-pdfs'),
    
    
    path('delete-video/<str:filename>/', DeleteVideoFileView.as_view(), name='delete_video_file'),
    

    


    
    
    
    
    # path('website-screenshot-generator/',WebsiteScreenshotTool.as_view(),name="website_screenshot_generator"),
    
    

    
    
    
    
    


    
    
    

    # path('text_to_image/',view_name,name=view_name),
    # path('jpg_to_png/',view_name,name=view_name),
    # path('png_to_jpg/',view_name,name=view_name),
    # path('json_to_xml/',view_name,name=view_name),
    # path('html_minifier/',view_name,name=view_name),
    # path('website_screenshot_generator/',view_name,name=view_name),
    # path('converters/',view_name,name=view_name),
    # path('calculators/',view_name,name=view_name),
]
