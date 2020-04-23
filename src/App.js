import React, { useState, useEffect }  from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [first, setFirst] = useState("osama");
  const [last, setLast] = useState("murshid");
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);
  const ob = {
    first: first,
    last: last 
  }
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
      </header>
    </div>
  );
}

export default App;
