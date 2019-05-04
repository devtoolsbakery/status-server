import React, {Component} from 'react';
import Head from 'next/head';
import Card from '../components/Card';

import '../styles/pages/user.css';


class User extends Component {
  constructor(props) {
    super();

    this.state = {
      user : 'Company server',
      theme : 'monkey' // example: use 'monkey' or 'minimal'
    }
  }

  render () {
    return (
      <>
        <Head>
          <title>{`${this.state.user}`} – system status</title>
          <meta name="description" content={`Real time system status of ${this.state.user}`} />
        </Head>
        <Card name={`${this.state.user}`} status='online' dayLimit='90' />
      </>
    )
  }
}

export default User;
