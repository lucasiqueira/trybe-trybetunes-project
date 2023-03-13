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
      loginEnabled: true,
      loginNameInput: '',
      isLoginIn: false,
      isLoggedIn: false,
    };
  }

  enableLoginButton = () => {
    const stringMinLimit = 3;
    const { loginNameInput } = this.state;
    if (loginNameInput.length >= stringMinLimit) {
      this.setState({ loginEnabled: false });
    } else {
      this.setState({ loginEnabled: true });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.enableLoginButton);
  };

  handleSubmitButon = async (e) => {
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
    const { loginEnabled, loginNameInput, isLoginIn, isLoggedIn } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={
              () => (<Login
                loginEnabled={ loginEnabled }
                loginNameInput={ loginNameInput }
                isLoginIn={ isLoginIn }
                handleChange={ this.handleChange }
                handleSubmitButon={ this.handleSubmitButon }
              />)
            }
          >
            { isLoggedIn ? <Redirect to="/search" /> : null }
          </Route>
          <Route exact path="/search" component={ Search } />
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
