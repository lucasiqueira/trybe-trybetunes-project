import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchUserName();
  }

  fetchUserName = () => {
    this.setState({ isLoading: true }, async () => {
      const userData = await getUser();
      this.setState({
        userName: userData.name,
        isLoading: false,
      });
    });
  };

  render() {
    const { userName, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <header data-testid="header-component">
        <h1>TrybeTunes</h1>
        <p>
          <span>Bem-vindo, </span>
          <span data-testid="header-user-name">{userName}</span>
        </p>
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
