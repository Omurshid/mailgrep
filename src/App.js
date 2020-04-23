import React, { useState, useEffect }  from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [first, setFirst] = useState("osama");
  const [last, setLast] = useState("murshid");
  const [count, setCount] = useState(0);
  const [domain, setDomain] = useState("lvs1.com");
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
    fetch('/api/get_mail', {
      method:"POST",
      cache: "no-cache",
      headers:{
          "content_type":"application/json",
      },
      body:JSON.stringify(d)
      }
  ).then(res => res.json()).then(data => {
      console.log("cat");
      setEmails(data.emails);
    });
  }, []);
  var mails=[];
  for (let i = 0; i < emails.length; i++) {
    var js = emails[i].json();
    mails.push(js.email)
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>The current time is {currentTime}.</p>
        <p>The name count is {count}.</p>
        <p>list of emails {emails}.</p>
      </header>
    </div>
  );
}

export default App;
