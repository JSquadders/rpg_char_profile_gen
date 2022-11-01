from django.urls import path, re_path

from main.views import main_page

urlpatterns = [
    re_path(r'', main_page, name='main')
]
