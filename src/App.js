import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Card from './components/Card';
import './css/components/App.css';

class App extends Component {
  constructor(props) {
    super();

    this.state = {
      username : 'Company server',
      theme : '' // example: use 'monkey' or 'minimal'
    }
  }

  render() {
    const description = `${this.state.username} system status`;
    return (
      <>
      <Helmet>
        <title>{this.state.username}</title>
        <meta name="description" content={`${description}`} />
        <body class={this.state.theme && `theme-${this.state.theme}`} />
      </Helmet>

      <Card name={`${this.state.username}`} dayLimit='90' />
      </>
    );
  }
}

export default App;