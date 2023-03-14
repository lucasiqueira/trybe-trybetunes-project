import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumSearchCard extends Component {
  render() {
    const { album } = this.props;
    const { artistName, collectionId, collectionName, artworkUrl100 } = album;
    return (
      <div>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h3>{collectionName}</h3>
          <p>{artistName}</p>
        </Link>
      </div>
    );
  }
}

AlbumSearchCard.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    artworkUrl100: PropTypes.string,
  }).isRequired,
};

export default AlbumSearchCard;
