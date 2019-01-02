#coding:utf-8



# https://item.jd.com/8132645.html#product-detail
# https://list.jd.com/list.html?cat=670,671,672&page=1&sort=sort_totalsales15_desc&trans=1&JL=6_0_0#J_main

# https://list.jd.com/list.html?cat=670,671,672&page=2&sort=sort_totalsales15_desc&trans=1&JL=6_0_0#J_main

from bs4 import BeautifulSoup
import requests
import re
import json
import xlwt
import random
page_list = []

num_of_pages = 958
headers = {
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
}
#958

def MakePcListOfPage(url):
	pclist_of_page = []
	page_content = requests.get(url,headers = headers).content.decode('utf-8', 'ignore')
	link_pattern = '<a target="_blank" title="" href="(.*?)">'
	pclist_of_page = re.findall(link_pattern, page_content)
	for i in range(0,len(pclist_of_page)):
		pclist_of_page[i] = "https:" + pclist_of_page[i]
	#print pclist_of_page
	return pclist_of_page

def MakePageList():
	for i in range(0,num_of_pages):
		page = "https://list.jd.com/list.html?cat=670,671,672&page="+str(i+1)+"&sort=sort_totalsales15_desc&trans=1&JL=6_0_0#J_main"
		page_list.append(page)

def GetPrice(url):
	goodsID = re.sub("\D","",url)
	price_url = 'https://p.3.cn/prices/mgets?pduid=' + str(random.randint(100000, 999999)) + '&skuIds=J_' + goodsID+ '&ext=11100000&source=item-pc'
	content = requests.get(price_url,headers=headers).content.decode('utf-8', 'ignore')
	print content
	Json = json.loads(content)[0]
	#print Json['p']
	return Json['p']



def GetGoodsInfo():
	MakePageList()

	for i in range(164,num_of_pages):
		print "page" + str(i+1)

		file = xlwt.Workbook(encoding = 'utf-8')
		table = file.add_sheet('data')


		pclist_of_page = MakePcListOfPage(page_list[i])
		if pclist_of_page is None:
			print "page fail:" + str(i+1)
		else:
			pass
		#each computer information
		p = 0
		for j in pclist_of_page:
			print j
			q = 0
			price = GetPrice(j)
			table.write(p,q,label = "prcie:" + str(price))
			q = 1
			page_content = requests.get(j).content.decode('gbk','ignore')
			bs_obj = BeautifulSoup(page_content,"html.parser")
			for k in bs_obj.findAll('ul',{'class':'parameter2 p-parameter-list'}):
				for m in k.children:
					t = str(m)
					t = re.sub("<[^>]*>","",t)
					t = re.sub("\\n","",t)
					if t is not None:
						table.write(p,q,label = t)
						q+=1
			p += 1
		file.save(str(i+1) + "test.xls")

if __name__ == '__main__':
	GetGoodsInfo()