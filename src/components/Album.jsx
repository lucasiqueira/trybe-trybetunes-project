import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.renderAlbum();
  }

  renderAlbum = async () => {
    this.setState({ isLoading: true }, async () => {
      const { match } = this.props;
      const { id } = match.params;
      const musics = await getMusics(id);
      this.setState({ musics, isLoading: false });
    });
  };

  render() {
    const { musics, isLoading } = this.state;
    console.log(musics);
    return (
      <div data-testid="page-album">
        <Header />
        {
          (isLoading) ? (
            <Loading />
          ) : (
            <div>
              <div>
                <img src={ musics[0]?.artworkUrl100 } alt={ musics[0]?.collectionName } />
                <h2 data-testid="album-name">{ musics[0]?.collectionName }</h2>
                <h3 data-testid="artist-name">{ musics[0]?.artistName }</h3>
              </div>
              <div>
                {
                  musics.map((music) => (
                    (music?.wrapperType === 'track') ? (
                      <div key={ music?.trackId }>
                        <p>{music?.trackName}</p>
                        <audio data-testid="audio-component" src={ music?.previewUrl }>
                          <track kind="captions" />
                          O seu navegador não suporta o elemento
                          {' '}
                          <code>audio</code>
                          .
                        </audio>
                      </div>
                    ) : null
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
