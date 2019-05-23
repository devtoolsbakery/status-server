import React, {Component} from 'react';
import Head from 'next/head';
import Card from '../components/Card';
import fetch from 'isomorphic-unfetch'
import '../styles/pages/user.css';


class User extends Component {
  constructor(props) {
    super();

    this.state = {
      user : 'Company server',
      theme : 'monkey' // example: use 'monkey' or 'minimal'
      // TODO: theming is not currently working nor propagated
    }
  }

  static async getInitialProps({ query }) {
    const { userId } = query;
    const result = await fetch(`http://localhost:3001/${userId}/endpoints`);
    return await result.json();
  }


  render () {
    return (
      <>
        <Head>
          <title>{`${this.state.user}`} – system status</title>
          <meta name="description" content={`Real time system status of ${this.state.user}`} />
        </Head>
        <Card name={`${this.state.user}`} status='online' dayLimit='90' endpoints={this.props.endpoints} />
      </>
    )
  }
}

export default User;
