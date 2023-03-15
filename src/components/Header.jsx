import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../assets/styles/Header.css';
import logo from '../assets/images/svg/logo.svg';
import searchIcon from '../assets/images/svg/search-icon.svg';
import favoriteIcon from '../assets/images/svg/favorite-icon.svg';
import profileIcon from '../assets/images/svg/profile-icon.svg';

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
        <h1 className="no-show">TrybeTunes</h1>
        <div className="header-container">
          <img src={ logo } alt="Logo" className="logo-header" />
          <div className="links-header">
            <div className="link-div">
              <img src={ searchIcon } alt="Search Icon" />
              <Link
                to="/search"
                data-testid="link-to-search"
                className="link-header"
              >
                Pesquisa
              </Link>
            </div>
            <div className="link-div">
              <img src={ favoriteIcon } alt="Favorite Icon" />
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
                className="link-header"
              >
                Favoritas
              </Link>
            </div>
            <div className="link-div">
              <img src={ profileIcon } alt="Profile Icon" />
              <Link
                to="/profile"
                data-testid="link-to-profile"
                className="link-header"
              >
                Perfil
              </Link>
            </div>
          </div>
          <div className="profile-data-in-header">
            <span className="no-show">Bem-vindo, </span>
            <img
              src={
                (localStorage.getItem('user').image)
                  ? (localStorage.getItem('user').image) : (profileIcon)
              }
              alt="Profile"
              className="profile-image"
            />
            <span data-testid="header-user-name">{userName}</span>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
