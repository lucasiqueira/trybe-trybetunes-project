import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import Search from './components/Search';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loginDisabled: true,
      searchDisabled: true,
      loginNameInput: '',
      searchArtistInput: '',
      isLoginIn: false,
      isLoggedIn: false,
    };
  }

  enableLoginButton = () => {
    const stringMinLimit = 3;
    const { loginNameInput } = this.state;
    if (loginNameInput.length >= stringMinLimit) {
      this.setState({ loginDisabled: false });
    } else {
      this.setState({ loginDisabled: true });
    }
  };

  enableSearchButton = () => {
    const stringMinLimit = 2;
    const { searchArtistInput } = this.state;
    if (searchArtistInput.length >= stringMinLimit) {
      this.setState({ searchDisabled: false });
    } else {
      this.setState({ searchDisabled: true });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.enableLoginButton();
      this.enableSearchButton();
    });
  };

  handleSearchButton = () => {
    return;
  }

  handleLoginButton = async (e) => {
    const { loginNameInput } = this.state;
    e.preventDefault();
    this.setState({ isLoginIn: true });
    await createUser({ name: loginNameInput });
    this.setState({
      isLoginIn: false,
      isLoggedIn: true,
    });
  };

  render() {
    const {
      loginDisabled,
      loginNameInput,
      isLoginIn,
      isLoggedIn,
      searchDisabled,
      searchArtistInput,
    } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={
              () => (<Login
                loginDisabled={ loginDisabled }
                loginNameInput={ loginNameInput }
                isLoginIn={ isLoginIn }
                handleChange={ this.handleChange }
                handleLoginButton={ this.handleLoginButton }
              />)
            }
          >
            { isLoggedIn ? <Redirect to="/search" /> : null }
          </Route>
          <Route
            exact
            path="/search"
            render={
              () => (<Search
                searchDisabled={ searchDisabled }
                searchArtistInput={ searchArtistInput }
                handleChange={ this.handleChange }
                handleSearchButton={ this.handleSearchButton }
              />)
            }
          />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
