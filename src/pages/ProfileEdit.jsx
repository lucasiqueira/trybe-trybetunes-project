import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import validateFields from '../helpers/validateFields';
import { getUser, updateUser } from '../services/userAPI';
import profileIcon from '../assets/images/svg/profile-icon.svg';
import '../assets/styles/ProfileEdit.css';

class ProfileEdit extends Component {
  state = {
    isLoading: false,
    editName: '',
    editEmail: '',
    editImage: '',
    editDescription: '',
    buttonDisabled: true,
  };

  componentDidMount() {
    this.fetchUserInfo();
  }

  fetchUserInfo = () => {
    this.setState({ isLoading: true }, async () => {
      const userInfo = await getUser();
      const { name, email, description, image } = userInfo;
      this.setState({
        editName: name,
        editEmail: email,
        editDescription: description,
        editImage: image,
        isLoading: false,
      }, () => {
        this.enableSaveButton();
      });
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.enableSaveButton);
  };

  enableSaveButton = () => {
    const enable = validateFields(this.state);
    this.setState({ buttonDisabled: !enable });
  };

  handleSaveButton = (e) => {
    const { history } = this.props;
    e.preventDefault();
    this.setState({ isLoading: true }, async () => {
      const { editName, editEmail, editDescription, editImage } = this.state;
      const newData = {
        name: editName,
        email: editEmail,
        description: editDescription,
        image: editImage,
      };
      await updateUser(newData);
      this.setState({ isLoading: false });
      history.push('/profile');
    });
  };

  render() {
    const {
      isLoading,
      editName,
      editEmail,
      editImage,
      editDescription,
      buttonDisabled,
    } = this.state;
    return (
      <div data-testid="page-profile-edit" className="profile-edit-page page-with-header">
        <section>
          <Header />
        </section>
        {
          (isLoading) ? (
            <Loading />
          ) : (
            <section className="general-page-section">
              <section className="general-article-header" />
              <section className="general-results">
                <img
                  src={
                    (JSON.parse(localStorage.getItem('user')).image) || (profileIcon)
                  }
                  alt="Profile"
                  className="profile-image-big"
                  data-testid="profile-image"
                />
                <input
                  type="text"
                  data-testid="edit-input-image"
                  value={ editImage }
                  name="editImage"
                  id="edit-image"
                  onChange={ this.handleChange }
                  className="input-img-link"
                  placeholder="insira um link"
                />
                <form className="profile-info-section">
                  <label>
                    <p className="profile-info-title">Nome</p>
                    <input
                      type="text"
                      data-testid="edit-input-name"
                      value={ editName }
                      name="editName"
                      id="edit-name"
                      className="edit-name edit-input"
                      onChange={ this.handleChange }
                    />
                  </label>
                  <label>
                    <p className="profile-info-title">E-mail</p>
                    <input
                      type="text"
                      data-testid="edit-input-email"
                      value={ editEmail }
                      name="editEmail"
                      id="edit-email"
                      className="edit-email edit-input"
                      onChange={ this.handleChange }
                    />
                  </label>
                  <label>
                    <p className="profile-info-title">Descrição</p>
                    <textarea
                      data-testid="edit-input-description"
                      value={ editDescription }
                      name="editDescription"
                      id="edit-description"
                      onChange={ this.handleChange }
                      className="edit-description"
                    />
                  </label>
                  <button
                    type="submit"
                    data-testid="edit-button-save"
                    disabled={ buttonDisabled }
                    onClick={ this.handleSaveButton }
                    className="edit-profile-button edit-profile-button-link"
                  >
                    Salvar
                  </button>
                </form>
              </section>
            </section>
          )
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
