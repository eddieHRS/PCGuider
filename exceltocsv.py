#coding:utf-8
import os
import pandas as pd
import xlwt
import xlrd

def washData(nameOfxlsx):
	workbook = xlrd.open_workbook(nameOfxlsx)
	workbooknew = xlwt.Workbook(encoding='utf-8', style_compression=0)
	sheet = workbook.sheet_by_index(0)
	sheetnew = workbooknew.add_sheet('test', cell_overwrite_ok=True)

	sheetnew.write(0,0,'price')
	sheetnew.write(0,1,'name')
	sheetnew.write(0,2,'weight')
	sheetnew.write(0,3,'cpu')
	sheetnew.write(0,4,'mem')
	sheetnew.write(0,5,'disk')
	sheetnew.write(0,6,'os')
	sheetnew.write(0,7,'xktype')
	sheetnew.write(0,8,'xkname')
	sheetnew.write(0,9,'workingtime')
	sheetnew.write(0,10,'screensize')


	new_sheet_row = 1

	for i in range(0,sheet.nrows):
		row = sheet.row_values(i)
		#print (row)
		if row is None:
			continue;
		for j in row:
			temp = j
			if 'prcie' in temp:
				t = temp.replace('prcie:','')
				sheetnew.write(new_sheet_row,0,t)
			elif '商品名称' in temp:
				t = temp.replace('商品名称：','')
				sheetnew.write(new_sheet_row,1,t)
			elif '商品毛重' in temp:
				t = temp.replace('商品毛重：','').replace('kg','')
				sheetnew.write(new_sheet_row,2,t)
			elif '处理器' in temp:
				t = temp.replace('处理器：','')
				sheetnew.write(new_sheet_row,3,t)
			elif '内存容量' in temp:
				t = temp.replace('内存容量：','')
				sheetnew.write(new_sheet_row,4,t)
			elif '硬盘容量' in temp:
				t = temp.replace('硬盘容量：','')
				sheetnew.write(new_sheet_row,5,t)
			elif '系统' in temp:
				t = temp.replace('系统：','')
				sheetnew.write(new_sheet_row,6,t)
			elif '显卡类别' in temp:
				t = temp.replace('显卡类型：','')
				sheetnew.write(new_sheet_row,7,t)
			elif '显卡型号' in temp:
				t = temp.replace('显卡型号：','')
				sheetnew.write(new_sheet_row,8,t)
			elif '待机时长' in temp:
				t = temp.replace('待机时长：','')
				sheetnew.write(new_sheet_row,9,t)
			elif '屏幕尺寸' in temp:
				t = temp.replace('屏幕尺寸：','')
				sheetnew.write(new_sheet_row,10,t)
		new_sheet_row += 1
	print(os.path.basename(nameOfxlsx) + 'result.xls')
	workbooknew.save(os.path.basename(nameOfxlsx) + 'result.xls')



def xlsx_to_csv_pd(nameOfxlsx):
	data_xls = pd.read_excel(nameOfxlsx,index_col = 0)
	data_xls.to_csv(nameOfxlsx.replace('xls','csv'),encoding='utf-8')

if __name__ == '__main__':
	washData("2test.xls")
	xlsx_to_csv_pd("2test.xlsresult.xls")