import React, {Component} from 'react';
import Card from '../components/Card';

import '../styles/pages/user.css';


class User extends Component {
  constructor(props) {
    super();

    this.state = {
      username : 'Company server',
      theme : 'monkey' // example: use 'monkey' or 'minimal'
    }
  }

  render () {
    return (
      <>
      <Card name={`${this.state.username}`} status='online' dayLimit='90' />
      {/* <>
        User page, the theme loaded is: {this.props.theme}
      </> */}
      </>
    )
  }
}

export default User;
