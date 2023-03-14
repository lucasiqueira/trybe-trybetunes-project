import { Component } from 'react';
import PropTypes from 'prop-types';
import MusicCard from './MusicCard';

class MusicContainer extends Component {
  render() {
    const { albumMusics, handleFavoriteCheck } = this.props;
    return (
      <div>
        {
          albumMusics.map((music) => (
            <MusicCard
              key={ music.trackId }
              trackId={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              handleFavoriteCheck={ handleFavoriteCheck }
            />
          ))
        }
      </div>
    );
  }
}

MusicContainer.propTypes = {
  albumMusics: PropTypes.arrayOf(shape({
    trackId: PropTypes.number,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  })).isRequired,
  handleFavoriteCheck: PropTypes.func.isRequired,
};

export default MusicContainer;
