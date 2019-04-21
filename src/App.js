import React, { Component } from 'react';
import Card from './components/Card';
import './css/components/App.scss';

class App extends Component {
  render() {
    return (
      <Card name='Company servers' dayLimit='90' theme='monkey' />
    );
  }
}

export default App;