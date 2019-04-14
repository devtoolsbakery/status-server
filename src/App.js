import React, { Component } from 'react';
import './css/App.scss';
import Card from './components/Card';

class App extends Component {
  render() {
    return (
      <Card name='company name' dayLimit='90' theme='minimal' />
    );
  }
}

export default App;