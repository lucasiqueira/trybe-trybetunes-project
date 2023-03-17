import { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import '../assets/styles/Profile.css';
import profileIcon from '../assets/images/svg/profile-icon.svg';
import ProfileInfo from '../components/ProfileInfo';

class Profile extends Component {
  state = {
    isLoading: false,
    userInfo: {},
  };

  componentDidMount() {
    this.fetchProfileInfo();
  }

  fetchProfileInfo = () => {
    this.setState({ isLoading: true }, async () => {
      const userInfo = await getUser();
      this.setState({
        isLoading: false,
        userInfo,
      });
    });
  };

  render() {
    const { isLoading, userInfo } = this.state;
    const { name, email, image, description } = userInfo;
    return (
      <div data-testid="page-profile" className="page-with-header page-profile">
        <section>
          <Header />
        </section>
        {
          (isLoading) ? (
            <Loading />
          ) : (
            <section className="general-page-section">
              <section className="general-article-header" />
              <section className="page-profile-section general-results">
                <img
                  src={ (image) || (profileIcon) }
                  alt="Profile"
                  className="profile-image-big"
                  data-testid="profile-image"
                />
                <ProfileInfo
                  name={ name }
                  email={ email }
                  description={ description }
                />
              </section>
            </section>
          )
        }
      </div>
    );
  }
}

export default Profile;
