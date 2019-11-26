import React from 'react';
import "./styles/RadioSet.css";

import Playlist from './Playlist';

class RadioSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [
        {
          side: 'Morning',
          tracks: this.calcTracks().morningTracks
        },
        {
          side: 'Evening',
          tracks: this.calcTracks().eveningTracks
        }
      ]
    }
  }

  calcTracks = () => {
    const morningTracks = this.props.tracks.slice(0, this.props.tracks.length / 2);
    const eveningTracks = this.props.tracks.slice(this.props.tracks.length / 2, this.props.tracks.length);
    return {morningTracks, eveningTracks};
  }

  toggleFavorite = ( trackTitle ) => {
    console.log('reached RadioSet: about to toggle favorite');

    // find the specific playlist
    const { playlists } = this.state;
    const playlistAffected = playlists.find(
      (playlist) => playlist.tracks.find(
        (track) => track.title === trackTitle
      )
    );
    const playlistAffectedName = playlistAffected.side;

    console.log(playlistAffected);

    // find specific track in playlist
    const { tracks } = playlistAffected;
    const trackToToggle = tracks.find((track) => track.title === trackTitle);

    console.log(tracks);
    console.log(trackToToggle);

    // toggle favorite
    trackToToggle.favorite = !Boolean(trackToToggle.favorite);
    playlistAffected.tracks = tracks;
    playlists[playlistAffectedName] = playlistAffected;

    // save and re-render
    this.setState( { playlists: playlists } );
  }

  moveToTop = ( trackTitle ) => {
    console.log('reached RadioSet: about to move to top');
  }

  playlistElements = () => {
    return this.state.playlists.map((playlist, i) => {
      return (
        <Playlist
          key={ i }
          side={ playlist.side }
          tracks={ playlist.tracks }
          toggleFavoriteCallback={ this.toggleFavorite }
          moveToTopCallback={ this.moveToTop }
        />
      );
    });
  }

  render() {
    console.log(`Radio set for ${this.props.tracks.length} tracks`);

    return (
      <div className="radio-set">
        <section className="radio-set--playlist-container">
          { this.playlistElements() }
        </section>
      </div>
    );
  }
};

export default RadioSet;