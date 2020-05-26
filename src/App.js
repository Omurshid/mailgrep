import React, {Component, useState, useEffect }  from 'react';
import logo from './logo.PNG';
import './App.css';
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
