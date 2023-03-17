import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import AlbumSearchCard from '../components/AlbumSearchCard';
import '../assets/styles/Search.css';
import searchInput from '../assets/images/svg/search-input-icon.svg';
import albumNotFound from '../assets/images/svg/album-not-found.svg';

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
      <div data-testid="page-search" className="page-search page-with-header">
        <section>
          <Header />
        </section>
        <section className="page-search-section general-page-section">
          <h1 className="no-show">Search</h1>
          <form className="search-form general-article-header">
            <label className="search-artist-label">
              <input
                type="text"
                data-testid="search-artist-input"
                value={ searchArtistInput }
                name="searchArtistInput"
                onChange={ handleChange }
                className="search-artist-input"
                placeholder="DIGITE A SUA PESQUISA"
              />
              <img src={ searchInput } alt="Lupa" />
            </label>
            <button
              type="submit"
              data-testid="search-artist-button"
              className="search-artist-button"
              disabled={ searchDisabled }
              onClick={ handleSearchButton }
            >
              Pesquisar
            </button>
          </form>
          <section className="search-results general-results">
            <div className="search-title">
              {
                (searchMade && searchResults.length !== 0) ? (
                  <span>
                    {`Resultado de álbuns de ${searchMade.toUpperCase()}:`}
                  </span>
                ) : null
              }
            </div>
            <div className="album-results">
              {
                (searchResults.length === 0) ? (
                  <div className="album-not-found-div">
                    <img
                      src={ albumNotFound }
                      alt="Não encontrado"
                      className="album-not-found-img"
                    />
                    <p className="album-not-found-text">Nenhum álbum foi encontrado</p>
                  </div>
                ) : (
                  searchResults
                    .map((a) => <AlbumSearchCard album={ a } key={ a.collectionId } />)
                )
              }
            </div>
          </section>
        </section>
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
