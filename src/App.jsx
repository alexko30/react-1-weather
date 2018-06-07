import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    icon: '',
    time: 1,
    city: '',
    temperature: '',
    weatherCode: '',
    fetching: true
  }

    render() {
        return (
            <div className="app">
            </div>
        );
    }
}

export default App;
