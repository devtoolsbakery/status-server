import React, { Component } from 'react';
import './css/App.scss';
import Card from './components/Card';

class App extends Component {
  render() {
    return (
      <Card name='microchoft servers' dayLimit='90' theme='' />
    );
  }
}

export default App;