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
    print(json)
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
        if listEmail == [] or listEmail == None:
            return {'status': 'No Emails Found.'}
        for elist in listEmail:
            for email in elist:
                eres = {}
                ###pwn
                pwndata = Pwned(email).search()
                if pwndata is None:
                    eres['pwn'] = ('%sThis email wasn\'t leaked\n'%spaces(1))
                elif pwndata['Breaches']:
                    headers  = '%sThis email was leaked... found %s results'%(spaces(1),len(pwndata['Breaches']))
                    eres['pwn'] = (headers)
                    pwn_details_list = []
                    try:
                        length_of_data = len(pwndata['Breaches'])
                        count = 0
                        for i in pwndata['Breaches']:
                            count+=1
                            if count == length_of_data:
                                pwn_details_list.append(i['Name'])
                            else:
                                pwn_details_list.append(f"{i['Name']}, ")
                            #
                            # pwn_details_list.append("N/A")
                        eres['pwn_details'] = pwn_details_list
                    except Exception as e:
                        print(e)
                        pass
                else:
                    eres['pwn'] = ('%sThis email wasn\'t leaked\n'%spaces(1))

                ##
                eres['email']=email
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

def engine(engine_list):
    listEmail = []
    listEmail = (Parallel(n_jobs=2)(delayed(search)(e) for e in engine_list))
    print(listEmail)
    return listEmail

def tester(email):
    return MailTester(email).search()
