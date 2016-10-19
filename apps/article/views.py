#_*_coding:utf-8_*_
__author__ = 'Administrator'
from django.shortcuts import render,render_to_response
from apps.libs.MongoHandle import MongoDB
import time
from django.contrib.auth.decorators import login_required

def article(request):
    pass

@login_required
def list(request):
    mongodb = MongoDB()
    result = mongodb.getData()
    data = []
    for item in result:
        item["id"]  = item["_id"]
        item["push_time"]  = time.strftime("%Y-%m-%d %H:%M:%S",time.localtime(int(item["push_time"])))
        data.append(item)
    data += data
    data += data
    return render_to_response("article/list.html",locals())

@login_required
def keyword(requeest):
    data = [{"keyword":"良品铺子","insertdate":"2016-10-18 23:44:44"},{"keyword":"iPhone","insertdate":"2016-10-18 23:44:44"}]
    return render_to_response("article/keyword.html",locals())