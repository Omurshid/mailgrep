import time
from joblib import Parallel, delayed
from flask import Flask, request, jsonify, send_from_directory
#
from lib.check import *
from lib.output import *
#
from recon.ask import *
from recon.baidu import *
from recon.bing import *
from recon.pgp import *
from recon.yahoo import *
from recon.dogpile import *
from recon.exalead import *
from recon.google import *
from recon.mailtester import *
from recon.pwned import *
from recon.shodan import *

app = Flask(__name__)

def get_engine_list(json,target):
    engine_list = []
    mapping = {'is_ask':Ask(target),
               'is_baidu':Baidu(target),
               'is_bing':Bing(target),
               'is_dogpile':Dogpile(target),
               'is_exalead':Exalead(target),
               'is_google':Google(target),
               'is_pgp':PGP(target),
               'is_shodan':Shodan(target),
               'is_yahoo':Yahoo(target),
               'is_pwned':Pwned(target)
                }
    for key in json.keys():
        if json[key] == True:
            if key != 'domain':
                engine_list.append(mapping[key])
    return engine_list
@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api/get_count', methods = ['POST'])
def result():
    json = request.json
    print(request)
    if json:
       return {'count': calculate(json['first'],json['last'])}
    return "No information is given"

@app.route('/api/get_mail', methods = ['POST'])
def get_email():
    spaces = lambda x: ' '*x
    listEmail = []
    res = {}
    res['emails'] = []
    json = request.json
    domain = json['domain']
    listEmail = []
    report = None
    verbose = 1
    start =time.time()
    engine_list = get_engine_list(json,domain)
    if domain != ('' or None):
	    listEmail = engine(engine_list)
    print(f"engine complete in {time.time()-start}")
    if json:
        #return {'count': calculate(json['first'],json['last'])}
        #TODO
        if listEmail == [] or listEmail == None:
            return {'status': 'No Emails Found.'}

        for email in listEmail:
            eres = {}
            ip = tester(email)
            if ip != ([] or None):
                ips = []
                for i in ip:
                    if i not in ips:ips.append(i)

                ####Shodan
                #semail = 'Email: %s (%s)'%(email,', '.join([x for x in ips]))
                #plus(semail)
                #if ips != []:
                #    shodanData = json.loads(Shodan(ips[0]).search())
                #    if shodanData == {}:
                #        shodanData = None
                #    if shodanData != None:
                #        headers = ''
                #        if shodanData.has_key('hostnames'):
                #            headers += '%s- Hostname: %s\n'%(spaces(1),shodanData.get('hostnames')[0])
                #        if shodanData.has_key('country_code') and shodanData.has_key('country_name'):
                #            headers += '%s- Country: %s (%s)\n'%(spaces(1),shodanData.get('country_code'),shodanData.get('country_name'))
                #        if shodanData.has_key('city') and shodanData.has_key('region_code'):
                #            headers += '%s- City: %s (%s)'%(spaces(1),shodanData.get('city'),shodanData.get('region_code'))
                #        eres['shodan'] = headers
                #    else:
                #        eres['shodan'] = ('No information found (on shodan) for this email, searching this ip/ips on internet..')
                ###
                ###pwn
                #pwndata = Pwned(semail).search()
                #if pwndata is None:
                #    print('%s>> This email wasn\'t leaked'%spaces(1))
                #    eres['pwn'] = ('%s>> This email wasn\'t leaked\n'%spaces(1))
                #elif pwndata.has_key('Breaches'):
                #    if pwndata.get('Breaches') is None and pwndata.has_key('Breaches'):
                #        pwndata.pop('Breaches')
                #        pwndata['Breaches'] = pwndata.pop('Pastes')
                #headers  = '%s>> This email was leaked... found %s results'%(spaces(1),len(pwndata['Breaches']))
                #eres['pwn'] = (headers)
                ##

                eres['ips']=ips
                eres['email']=email
            else:
                eres['info'] = ('No info found for %s'%(email))
            print(eres)
            res['emails'].append(eres)
    else:
        return {'status': "No domain provided."}
    return res


def search(module):
        emails = module.search()
        listEmail = []
        if emails != ([] or None):
            for email in emails:
                if email not in listEmail:
                    listEmail.append(email)
        return(listEmail)
			#if self.verbose in (1,2,3):
			#	info('Found %s emails in %s'%(len(emails),
			#		module.__class__.__name__))

def engine(engine_list):
    listEmail = []
    listEmail.append(Parallel(n_jobs=2)(delayed(search)(e) for e in engine_list))
    return listEmail
    #else:
     #   for e in engine_list:
      #      if e.__class__.__name__.lower() in engine:self.search(e)

def tester(email):
    return MailTester(email).search()
