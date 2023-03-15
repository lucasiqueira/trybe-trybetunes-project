import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isChecked: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.verifyChecked();
  }

  handleChange = ({ target }) => {
    const { song } = this.props;
    this.setState({ isLoading: true }, async () => {
      if (target.checked) {
        await addSong(song);
        this.setState({
          isLoading: false,
          isChecked: true,
        });
      } else {
        await removeSong(song);
        this.setState({
          isLoading: false,
          isChecked: false,
        });
      }
    });
  };

  verifyChecked = async () => {
    const favorites = await getFavoriteSongs();
    const { song } = this.props;
    const { trackId } = song;
    const result = favorites.some((music) => music.trackId === trackId);
    this.setState({ isChecked: result });
  };

  render() {
    const { song } = this.props;
    const {
      trackId,
      trackName,
      previewUrl,
    } = song;
    const { isChecked, isLoading } = this.state;
    if (isLoading) return <Loading />;
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
            onChange={ this.handleChange }
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
  song: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
