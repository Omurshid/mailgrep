import React, {Component, useState, useEffect }  from 'react';
import logo from './logo.svg';
import './App.css';
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";

import Form from './components/Form';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          MailGrep
        </p>
        <Form />
      </header>
    </div>
  );
}

export default App;
