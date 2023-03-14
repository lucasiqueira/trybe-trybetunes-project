import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';
import MusicContainer from './MusicContainer';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      albumMusics: [],
      albumInfo: {},
      isAlbumPageLoading: false,
    };
  }

  componentDidMount() {
    this.renderAlbum();
  }

  handleFavoriteCheck = ({ target }) => {
    const id = Number(target.id.split('-')[2]);
    const { albumMusics } = this.state;
    const song = albumMusics.find((music) => music.trackId === id);
    this.setState({ isAlbumPageLoading: true }, async () => {
      await addSong(song);
      this.setState({ isAlbumPageLoading: false });
    });
  };

  renderAlbum = async () => {
    this.setState({ isAlbumPageLoading: true }, async () => {
      const { match } = this.props;
      const { id } = match.params;
      const [albumInfo, ...albumMusics] = await getMusics(id);
      this.setState({ albumMusics, albumInfo, isAlbumPageLoading: false });
    });
  };

  render() {
    const { albumInfo, albumMusics, isAlbumPageLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          (isAlbumPageLoading) ? (
            <Loading />
          ) : (
            <div>
              <div>
                <img src={ albumInfo.artworkUrl100 } alt={ albumInfo.collectionName } />
                <h2 data-testid="album-name">{ albumInfo.collectionName }</h2>
                <h3 data-testid="artist-name">{ albumInfo.artistName }</h3>
              </div>
              <MusicContainer
                albumMusics={ albumMusics }
                isAlbumPageLoading={ isAlbumPageLoading }
                handleFavoriteCheck={ this.handleFavoriteCheck }
              />
            </div>
          )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
