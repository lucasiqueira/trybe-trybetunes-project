import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      albumMusics: [],
      albumInfo: {},
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
      const [albumInfo, ...albumMusics] = musics;
      this.setState({ albumMusics, albumInfo, isLoading: false });
    });
  };

  render() {
    const { albumInfo, albumMusics, isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          (isLoading) ? (
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
                  albumMusics.map((music) => {
                    console.log(music);
                    return (
                      <div key={ music.trackId }>
                        <p>{music.trackName}</p>
                        <audio
                          data-testid="audio-component"
                          src={ music.previewUrl }
                          controls
                        >
                          <track kind="captions" />
                          O seu navegador não suporta o elemento
                          {' '}
                          {' '}
                          <code>audio</code>
                          .
                        </audio>
                      </div>
                    );
                  })
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
