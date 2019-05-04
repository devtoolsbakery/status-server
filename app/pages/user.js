import React, {Component} from 'react';

class User extends Component {
  render () {
    return (
      <>
        User page, the theme loaded is: {this.props.theme}
      </>
    )
  }
}

export default User;
