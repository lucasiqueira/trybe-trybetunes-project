import { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from './Header';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Favorites extends Component {
  state = {
    isLoading: false,
  };

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  fetchFavoriteSongs = async () => {
    this.setState({ isLoading: true }, async () => {
      const favorites = await getFavoriteSongs();
      this.setState({
        favorites,
        isLoading: false,
      });
    });
  };

  render() {
    const { isLoading, favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          (isLoading) ? (
            <Loading />
          ) : (
            <div>
              {
                favorites.map((music) => (
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
          )
        }
      </div>
    );
  }
}

export default Favorites;
