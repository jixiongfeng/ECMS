#_*_coding:utf-8_*_
__author__ = 'Administrator'
from django.shortcuts import render,render_to_response
from apps.libs.MongoHandle import MongoDB
import time

def test(request):
    return render_to_response("base.html",locals())