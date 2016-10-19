#_*_coding:utf-8_*_


import xadmin
from xadmin.plugins import xversion
xadmin.autodiscover()
xversion.register_models()

from django.conf.urls import patterns, include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings
from apps.admin.views import login,loginout
from apps.article.views import list,keyword
from apps.home.views import HomePage
from views import test
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()
import os

APP_NAME = 'admin'
urls_mapping = []

#主页
urls_mapping.append(url(r'^$', HomePage, name='HomePage'))
urls_mapping.append(url(r'^test$', test, name='test'))

urls_mapping.append(url(r'^article/list$', list, name='article'))

urls_mapping.append(url(r'^article/keyword$', keyword, name='article'))

urls_mapping.append(url(r'^login$', login, name='login'))
urls_mapping.append(url(r'^accounts/login/$', login, name='login'))

urls_mapping.append(url(r'^loginout$', loginout, name='loginout'))

urls_mapping.append(url(r'^admin', include('apps.admin.urls')))
urls_mapping.append(
    url(r'^site_media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}))



urlpatterns = patterns('', *urls_mapping)
urlpatterns += staticfiles_urlpatterns()