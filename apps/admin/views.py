__author__ = 'Administrator'
from django.shortcuts import render,render_to_response
from django.contrib import auth
from django.http import HttpResponseRedirect

def login(request):
    if request.method == "POST":
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        user = auth.authenticate(username=username, password=password)
        if user is not None and user.is_active:
            auth.login(request, user)
        return HttpResponseRedirect("/")

    else:
        return render_to_response("login.html",locals())


def loginout(request):
    auth.logout(request)

    return HttpResponseRedirect("/login")