import React, { Component } from 'react';
import Card from './components/Card';
import './css/components/App.scss';

class App extends Component {
  render() {
    return (
      <Card name='company name' dayLimit='90' />
    );
  }
}

export default App;