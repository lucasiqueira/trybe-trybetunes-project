import { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import '../assets/styles/Login.css';
import logo from '../assets/images/svg/logo.svg';

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
      <div className="login-body">
        <div data-testid="page-login" className="page-login">
          <h1>Login</h1>
          <img src={ logo } alt="Logo" />
          <form>
            <label htmlFor="login-name-input" className="login-name-label">
              <input
                type="text"
                data-testid="login-name-input"
                placeholder="qual é o seu nome?"
                value={ loginNameInput }
                onChange={ handleChange }
                name="loginNameInput"
                className="login-name-input"
              />
            </label>
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ loginDisabled }
              onClick={ handleLoginButton }
              className="login-submit-button"
            >
              ENTRAR
            </button>
          </form>
        </div>
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
