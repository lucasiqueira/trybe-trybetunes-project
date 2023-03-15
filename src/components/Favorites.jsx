import { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from './Header';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Favorites extends Component {
  state = {
    isLoading: false,
    favorites: [],
  };

  componentDidMount() {
    this.fetchFavorites();
  }

  removeFavoriteSong = (trackId) => {
    const { favorites } = this.state;
    const newFavorites = favorites.filter((song) => song.trackId !== trackId);
    this.setState({ favorites: newFavorites });
  };

  fetchFavorites = () => {
    this.setState({ isLoading: true }, async () => {
      const favorites = await getFavoriteSongs();
      console.log(favorites);
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
                favorites.map((song) => (
                  <MusicCard
                    key={ song.trackId }
                    song={ song }
                    removeFavoriteSong={ this.removeFavoriteSong }
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
