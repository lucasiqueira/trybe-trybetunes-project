import { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../assets/styles/ProfileInfo.css';

class ProfileInfo extends Component {
  render() {
    const { name, email, description } = this.props;
    return (
      <section className="profile-info-section">
        <div>
          <h4 className="profile-info-title">Nome</h4>
          <p className="profile-info-text">{name}</p>
        </div>
        <div>
          <h4 className="profile-info-title">E-mail</h4>
          <p className="profile-info-text">{email}</p>
        </div>
        <div>
          <h4 className="profile-info-title">Descrição</h4>
          <p className="profile-info-text">{description}</p>
        </div>
        <div className="edit-profile-button">
          <Link to="/profile/edit" className="edit-profile-button-link">
            Editar perfil
          </Link>
        </div>
      </section>
    );
  }
}

ProfileInfo.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ProfileInfo;
