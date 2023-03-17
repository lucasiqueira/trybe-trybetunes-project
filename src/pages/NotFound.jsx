import { Component } from 'react';
import '../assets/styles/NotFound.css';

class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found" className="page-not-found">
        <p className="ops">Ops!</p>
        <p className="not-found-text">
          A página que você está procurando não foi encontrada
        </p>
      </div>
    );
  }
}

export default NotFound;
