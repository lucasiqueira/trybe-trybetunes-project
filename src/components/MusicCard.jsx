import { Component } from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isChecked: false,
    };
  }

  componentDidMount() {
    this.verifyChecked();
  }

  verifyChecked = async () => {
    const favorites = await getFavoriteSongs();
    const { trackId } = this.props;
    const result = favorites.some((music) => music.trackId === trackId);
    this.setState({ isChecked: result });
  };

  render() {
    const {
      trackId,
      trackName,
      previewUrl,
      handleFavoriteCheck,
    } = this.props;
    const { isChecked } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="checkboxMusic">
          <input
            type="checkbox"
            name="checkboxMusic"
            id={ `checkbox-music-${trackId}` }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ handleFavoriteCheck }
            checked={ isChecked }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  handleFavoriteCheck: PropTypes.func.isRequired,
};

export default MusicCard;
