import { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    const { loginEnabled, loginNameInput, handleChange } = this.props;
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <label htmlFor="login-name-input">
          <input
            type="text"
            data-testid="login-name-input"
            placeholder="qual é o seu nome?"
            value={ loginNameInput }
            onChange={ handleChange }
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ loginEnabled }
        >
          ENTRAR
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  loginEnabled: PropTypes.bool.isRequired,
  loginNameInput: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Login;
