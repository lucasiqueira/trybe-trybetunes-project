import { Component } from 'react';
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
      </header>
    );
  }
}

export default Header;
