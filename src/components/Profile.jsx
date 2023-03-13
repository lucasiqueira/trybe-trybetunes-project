import { Component } from 'react';
import Header from './Header';

class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <p>Profile</p>
      </div>
    );
  }
}

export default Profile;
