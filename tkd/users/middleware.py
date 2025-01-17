from django.utils.deprecation import MiddlewareMixin
import re

class CSRFExemptMiddleware(MiddlewareMixin):
    def process_view(self, request, callback, callback_args, callback_kwargs):
        exempt_urls = [
            r'^/users/login/?$',
            r'^/users/register/?$',
            r'^/users/admin/login/?$',
        ]
        path = request.path_info.lstrip('/')
        if any(re.match(m, path) for m in exempt_urls):
            setattr(request, '_dont_enforce_csrf_checks', True)
