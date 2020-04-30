import React, {Component, useState, useEffect }  from 'react';
import logo from './logo.PNG';
import glass from './glass.PNG';
import './App.css';
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";
import Form from './components/Form';

function App() {

  return (
    <div>
    <center>
    <img src={logo} className="logo"/>
        <Form />
        </center>
    </div>
  );
}

export default App;
