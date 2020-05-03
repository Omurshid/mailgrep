import requests
from lib.parser import *

class MailTester():
	def __init__(self,email):
		self.email = email

	def search(self):
		post_data = {'lang':'en'}
		post_data['email'] = self.email
		url = "http://mailtester.com/testmail.php"
		try:
			headers = {
			'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
			'accept-encoding': 'gzip, deflate, br',
			'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
			'cache-control': 'max-age=0',
			'cookie': '',
			'sec-fetch-dest': 'document',
			'sec-fetch-mode': 'navigate',
			'sec-fetch-site': 'none',
			'sec-fetch-user': '?1',
			'upgrade-insecure-requests': '1',
			'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36'
			}
			resp = requests.get(url,headers=headers)
			return self.getip(resp.content)
		except Exception as e:
			print(e)

	def getip(self,content):
		tmp_ip = re.findall(r'[0-9]+(?:\.[0-9]+){3}',str(content),re.I)
		list_ip = []
		for ip in tmp_ip:
			if ip not in list_ip:
				list_ip.append(ip)
		return list_ip