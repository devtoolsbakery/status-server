import React, { Component } from 'react';
import Card from './components/Card';
import './css/components/App.css';

class App extends Component {
  constructor(props) {
    super();

    this.state = {
      theme : '' // example: use 'monkey' or 'minimal'
    }
  }

  componentDidMount() {
    // Checks for theme and loads if needed
    if (this.state.theme) {
      try {
        require(`./css/themes/${this.state.theme}.css`);
      } catch (error) {
        console.error(error);
      }
    }
  }

  render() {
    return (
      <div className={this.state.theme && `theme-${this.state.theme}`}>
        <Card name='Company servers' dayLimit='90' />
      </div>
    );
  }
}

export default App;