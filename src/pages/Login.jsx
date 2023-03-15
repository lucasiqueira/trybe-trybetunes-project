import { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';

class Login extends Component {
  render() {
    const {
      loginDisabled,
      loginNameInput,
      isLoginIn,
      handleChange,
      handleLoginButton,
    } = this.props;
    if (isLoginIn) {
      return (
        <div data-testid="page-login">
          <Loading />
        </div>
      );
    }
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <form>
          <label htmlFor="login-name-input">
            <input
              type="text"
              data-testid="login-name-input"
              placeholder="qual é o seu nome?"
              value={ loginNameInput }
              onChange={ handleChange }
              name="loginNameInput"
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ loginDisabled }
            onClick={ handleLoginButton }
          >
            ENTRAR
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginDisabled: PropTypes.bool.isRequired,
  loginNameInput: PropTypes.string.isRequired,
  isLoginIn: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleLoginButton: PropTypes.func.isRequired,
};

export default Login;
