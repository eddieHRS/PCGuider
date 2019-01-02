#coding:utf-8
import pymysql
import xlwt
import xlrd
import chardet
import re


DatabaseUser = "root"
DatabasePassword = "abc123"
connection = pymysql.connect(user = DatabaseUser,password = DatabasePassword,host = '127.0.0.1',db = 'JD_Goods')
cursor = connection.cursor()
cursor.execute('drop table if exists new_Goods;')
cursor.execute(
	'create table new_Goods(name varchar(100),CPU_type varchar(100),disk varchar(50),price float ,weight float, mem int);')

table_name = "1test.xls"
workbook = xlrd.open_workbook(table_name)
sheet = workbook.sheet_by_index(0)
for i in range(0,60):
	row = sheet.row_values(i)
	name = "未知"
	cpu = '其他' 
	disk = "未知"
	price = 0.0
	weight = 0.0
	mem = 0 
	for j in row:
		temp = j.encode('utf-8').replace('其他','')
		if 'prcie' in temp:
			t = temp.replace('prcie:','')
			if t is not None:
				price = float(t)
		elif '商品名称' in temp:
			name = temp.replace('商品名称：','')
		elif '商品毛重' in temp:
			t = temp.replace('商品毛重：','').replace('kg','')
			if t is not None:
				weight = float(t)
		elif '处理器' in temp:
			cpu = temp.replace('处理器：','')
		elif '内存容量' in temp:
			t = temp.replace('内存容量：','').replace('G','')
			if t != '':
				mem = int(t)
		elif '硬盘容量' in temp:
			disk = temp.replace('硬盘容量：','')
	sql = 'insert into new_Goods values(\'{}\',\'{}\',\'{}\',{},{},{})'.format(name,cpu,disk,price,weight,mem)
	print sql
	cursor.execute(sql)
	connection.commit()
