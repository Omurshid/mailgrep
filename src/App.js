import React, { useState, useEffect }  from 'react';
import logo from './logo.svg';
import './App.css';
import { trackPromise } from 'react-promise-tracker';

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [first, setFirst] = useState("osama");
  const [last, setLast] = useState("murshid");
  const [count, setCount] = useState(0);
  const [domain, setDomain] = useState("adp.com");
  const [emails, setEmails] = useState([]);
  console.log("dog");
  const ob = {
    first: first,
    last: last 
  }
  const d = {
    domain: domain
  }
  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);
  
  useEffect(() => {
    fetch('/api/get_count', {
      method:"POST",
      cache: "no-cache",
      headers:{
          "content_type":"application/json",
      },
      body:JSON.stringify(ob)
      }
  ).then(res => res.json()).then(data => {
      setCount(data.count);
    });
  }, []);
  
  useEffect(() => {
    trackPromise(fetch('/api/get_mail', {
      method:"POST",
      cache: "no-cache",
      headers:{
          "content_type":"application/json",
      },
      body:JSON.stringify(d)
      }
    ).then(res => res.json())).then(data => {
      console.log("cat");
      setEmails(data.emails);
    });
  }, []);
  var mail = []
  for (let i = 0; i < emails.length; i++) {
    for (let j = 0; j < emails[i].email.length; j++) {
      mail.push(emails[i].email[j])
    
   
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          MailGrep
        </p>
        <p>The current time is {currentTime}.</p>
        <p>The name count is {count}.</p>
        <p>list of emails found: {mail}.</p>
      </header>
    </div>
  );
}

export default App;
