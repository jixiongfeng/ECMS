__author__ = 'Administrator'
from django.conf.urls import patterns, url
from views import login


urlpatterns = patterns('',
    url(r'^login$', login, name='login'),
    url(r'^loginout$', login, name='loginout'),
)