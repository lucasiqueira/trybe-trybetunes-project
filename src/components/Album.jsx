import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      albumMusics: [],
      albumInfo: {},
      isAlbumPageLoading: false,
      favoritesSongs: [],
    };
  }

  componentDidMount() {
    this.renderAlbum();
    this.fetchFavoriteSongs();
  }

  handleFavoriteCheck = ({ target }) => {
    const id = Number(target.id.split('-')[2]);
    const { albumMusics } = this.state;
    const song = albumMusics.find((music) => music.trackId === id);
    if (target.checked) {
      this.setState({ isAlbumPageLoading: true }, async () => {
        await addSong(song);
        this.fetchFavoriteSongs();
        this.setState({ isAlbumPageLoading: false });
      });
    } else {
      this.setState({ isAlbumPageLoading: true }, async () => {
        await removeSong(song);
        this.fetchFavoriteSongs();
        this.setState({ isAlbumPageLoading: false });
      });
    }
  };

  fetchFavoriteSongs = () => {
    this.setState({ isAlbumPageLoading: true }, async () => {
      const favorites = await getFavoriteSongs();
      this.setState({
        favoritesSongs: favorites,
        isAlbumPageLoading: false,
      });
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
    const { albumInfo, albumMusics, isAlbumPageLoading, favoritesSongs } = this.state;
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
              <div>
                {
                  albumMusics.map((music) => (
                    <MusicCard
                      key={ music.trackId }
                      trackId={ music.trackId }
                      trackName={ music.trackName }
                      previewUrl={ music.previewUrl }
                      handleFavoriteCheck={ this.handleFavoriteCheck }
                      favoritesSongs={ favoritesSongs }
                      isAlbumPageLoading={ isAlbumPageLoading }
                    />
                  ))
                }
              </div>
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
