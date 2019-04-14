import React, { Component } from 'react';
import './css/App.scss';
import Card from './components/Card';

class App extends Component {
  render() {
    return (
      <Card dayLimit='90' theme='' />
    );
  }
}

export default App;