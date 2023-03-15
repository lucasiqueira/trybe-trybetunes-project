import { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

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
