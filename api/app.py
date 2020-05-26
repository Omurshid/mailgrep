import time
from joblib import Parallel, delayed
from flask import Flask, request, jsonify, send_from_directory
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
from json import loads

app = Flask(__name__)

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
    if json:
        if listEmail == [] or listEmail == None:
            return {'status': 'No Emails Found.'}
        for elist in listEmail:
            for email in elist:
                eres = {}
                ###pwn
                pwndata = Pwned(email).search()
                pwn_details_list = []
                count = 0
                if pwndata is None:
                    pwn_details_list.append('%sThis email wasn\'t leaked\n'%spaces(1))
                elif pwndata['Breaches']:
                    try:
                        count = 0
                        length_of_data = len(pwndata['Breaches'])
                        for i in pwndata['Breaches']:
                            count+=1
                            if count == 1:
                                pwn_details_list.append(str(i['Name']))
                            else:
                                pwn_details_list.append(str(i['Name']))
                    except Exception as e:
                        print(e)
                        pass
                else:
                    pwn_details_list.append('%sThis email wasn\'t leaked\n'%spaces(1))
                eres['pwn_details'] = pwn_details_list
                eres['pwn_length'] = count

                ##
                eres['email']=email
                res['emails'].append(eres)
    else:
        return {'status': "No domain provided."}
    return res

def get_engine_list(json,target):
    engine_list = []
    mapping = {'is_ask':Ask(target),
               'is_baidu':Baidu(target),
               'is_bing':Bing(target),
               'is_dogpile':Dogpile(target),
               'is_exalead':Exalead(target),
               'is_google':Google(target),
               'is_pgp':PGP(target),
               'is_yahoo':Yahoo(target)
                }
    for key in json.keys():
        if json[key] == True:
            if key != 'domain':
                engine_list.append(mapping[key])
    return engine_list

def search(module):
        emails = module.search()
        listEmail = []
        if emails != ([] or None):
            for email in emails:
                if email not in listEmail:
                    listEmail.append(email)
        return(listEmail)

def engine(engine_list):
    listEmail = []
    listEmail = (Parallel(n_jobs=2)(delayed(search)(e) for e in engine_list))
    return listEmail

def tester(email):
    return MailTester(email).search()
