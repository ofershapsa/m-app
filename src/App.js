import React, { Component } from 'react';
import './App.css';
import Timer from './Timer.jsx'
import ContactsList from './ContactsList'

class App extends Component {


  render() {
    return (
      <div className="App">
        <h1>Welcome to MBank</h1>
        <Timer />
        <ContactsList />

      </div>

    );
  }
}

export default App;
