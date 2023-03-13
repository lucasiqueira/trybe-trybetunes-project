import { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

class Login extends Component {
  render() {
    const {
      loginEnabled,
      loginNameInput,
      isLoginIn,
      handleChange,
      handleSubmitButon,
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
            disabled={ loginEnabled }
            onClick={ handleSubmitButon }
          >
            ENTRAR
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginEnabled: PropTypes.bool.isRequired,
  loginNameInput: PropTypes.string.isRequired,
  isLoginIn: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmitButon: PropTypes.func.isRequired,
};

export default Login;
