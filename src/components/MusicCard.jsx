import { Component } from 'react';
import PropTypes, { shape } from 'prop-types';

class MusicCard extends Component {
  render() {
    const { albumMusics } = this.props;
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
};

export default MusicCard;
