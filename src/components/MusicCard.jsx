import { Component } from 'react';
import PropTypes, { shape } from 'prop-types';

class MusicCard extends Component {
  render() {
    const { albumMusics, handleFavoriteCheck } = this.props;
    return (
      <div>
        {
          albumMusics.map((music) => (
            <div key={ music.trackId }>
              <p>{music.trackName}</p>
              <audio
                data-testid="audio-component"
                src={ music.previewUrl }
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
                  id={ `checkbox-music-${music.trackId}` }
                  data-testid={ `checkbox-music-${music.trackId}` }
                  onChange={ handleFavoriteCheck }
                />
                Favorita
              </label>
            </div>
          ))
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  albumMusics: PropTypes.arrayOf(shape({
    trackId: PropTypes.number,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  })).isRequired,
  handleFavoriteCheck: PropTypes.func.isRequired,
};

export default MusicCard;
