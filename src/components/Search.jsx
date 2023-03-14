import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Loading from './Loading';
import AlbumSearchCard from './AlbumSearchCard';

class Search extends Component {
  render() {
    const {
      searchDisabled,
      searchArtistInput,
      handleChange,
      handleSearchButton,
      isSearching,
      searchMade,
      searchResults,
    } = this.props;
    if (isSearching) return <Loading />;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <form>
          <label htmlFor="searchArtirtInput">
            <input
              type="text"
              data-testid="search-artist-input"
              value={ searchArtistInput }
              name="searchArtistInput"
              onChange={ handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ searchDisabled }
            onClick={ handleSearchButton }
          >
            Pesquisar
          </button>
        </form>
        <div>
          <div>
            {
              (searchMade && searchResults.length !== 0) ? (
                <span>{`Resultado de álbuns de: ${searchMade}`}</span>
              ) : null
            }
          </div>
          <div>
            {
              (searchResults.length === 0) ? (
                <p>Nenhum álbum foi encontrado</p>
              ) : (
                searchResults
                  .map((a) => <AlbumSearchCard album={ a } key={ a.collectionId } />)
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  searchDisabled: PropTypes.bool.isRequired,
  searchArtistInput: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSearchButton: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
  searchMade: PropTypes.string.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.shape({
    collectionId: PropTypes.number,
  })).isRequired,
};

export default Search;
