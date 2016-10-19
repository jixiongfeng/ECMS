#_*_coding:utf-8_*_
__author__ = 'Administrator'
from django.shortcuts import render,render_to_response
from django.contrib.auth.decorators import login_required

@login_required
def HomePage(request):
    return render_to_response("index.html",locals())