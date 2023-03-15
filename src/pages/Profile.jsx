import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

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
      <div data-testid="page-profile">
        <Header />
        {
          (isLoading) ? (
            <Loading />
          ) : (
            <div>
              <div>
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
              <img src={ image } alt="Foto do perfil" data-testid="profile-image" />
              <div>
                <h4>Nome</h4>
                <p>{name}</p>
              </div>
              <div>
                <h4>E-mail</h4>
                <p>{email}</p>
              </div>
              <div>
                <h4>Descrição</h4>
                <p>{description}</p>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default Profile;
