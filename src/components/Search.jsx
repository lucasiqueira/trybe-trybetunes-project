import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

class Search extends Component {
  render() {
    const {
      searchDisabled,
      searchArtistInput,
      handleChange,
      handleSearchButton,
    } = this.props;
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
      </div>
    );
  }
}

Search.propTypes = {
  searchDisabled: PropTypes.bool.isRequired,
  searchArtistInput: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSearchButton: PropTypes.func.isRequired,
};

export default Search;
