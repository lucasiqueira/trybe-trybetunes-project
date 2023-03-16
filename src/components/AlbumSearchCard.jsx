import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../assets/styles/AlbumSearchCard.css';

class AlbumSearchCard extends Component {
  render() {
    const { album } = this.props;
    console.log(album);
    const { artistName, collectionId, collectionName, artworkUrl100 } = album;
    return (
      <div className="album-card">
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
          className="album-link"
        >
          <img
            src={ artworkUrl100 }
            alt={ collectionName }
            className="album-img-in-search"
          />
          <h3 className="album-title-in-search">{collectionName}</h3>
          <p className="album-artist-in-search">{artistName}</p>
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
