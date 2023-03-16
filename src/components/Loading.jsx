import { Component } from 'react';
import '../assets/styles/Loading.css';
import loadingIcon from '../assets/images/svg/loading.svg';

class Loading extends Component {
  render() {
    return (
      <div className="loading-container">
        <img src={ loadingIcon } alt="Carregando" />
        <p className="loading-text">carregando...</p>
      </div>
    );
  }
}

export default Loading;
