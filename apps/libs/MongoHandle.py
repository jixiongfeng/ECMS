#_*_coding:utf-8_*_
__author__ = 'Administrator'
import pymongo

class MongoDB():
    def __init__(self):
        self.conn = pymongo.Connection("120.77.15.55",27017)
        self.db = self.conn.YQ_analysis #���ӿ�

    def getData(self):
         return  list(self.db.articles.find())


    


