import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import Search from './components/Search';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loginEnabled: true,
      loginNameInput: '',
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

  render() {
    const { loginEnabled, loginNameInput } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={ Login }
            loginEnabled={ loginEnabled }
            loginNameInput={ loginNameInput }
            handleChange={ this.handleChange }
          />
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
