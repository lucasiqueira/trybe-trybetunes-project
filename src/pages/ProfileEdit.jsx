import { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import validateFields from '../helpers/validateFields';
import { getUser } from '../services/userAPI';

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
      });
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.enableSaveButton);
  };

  enableSaveButton = () => {
    const enable = validateFields(this.state);
    console.log(enable);
    this.setState({ buttonDisabled: !enable });
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
      <div data-testid="page-profile-edit">
        <Header />
        {
          (isLoading) ? (
            <Loading />
          ) : (
            <div>
              <form>
                <label>
                  <p>Nome</p>
                  <input
                    type="text"
                    data-testid="edit-input-name"
                    value={ editName }
                    name="editName"
                    id="edit-name"
                    onChange={ this.handleChange }
                  />
                </label>
                <label>
                  <p>E-mail</p>
                  <input
                    type="text"
                    data-testid="edit-input-email"
                    value={ editEmail }
                    name="editEmail"
                    id="edit-email"
                    onChange={ this.handleChange }
                  />
                </label>
                <label>
                  <p>Descrição</p>
                  <input
                    type="text"
                    data-testid="edit-input-description"
                    value={ editDescription }
                    name="editDescription"
                    id="edit-description"
                    onChange={ this.handleChange }
                  />
                </label>
                <label>
                  <p>Foto do Perfil</p>
                  <input
                    type="text"
                    data-testid="edit-input-image"
                    value={ editImage }
                    name="editImage"
                    id="edit-image"
                    onChange={ this.handleChange }
                  />
                </label>
                <button
                  type="submit"
                  data-testid="edit-button-save"
                  disabled={ buttonDisabled }
                >
                  Salvar
                </button>
              </form>
            </div>
          )
        }
      </div>
    );
  }
}

export default ProfileEdit;
