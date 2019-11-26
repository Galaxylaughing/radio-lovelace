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

  findListWithTrack = ( playlists, trackTitle ) => {
    const playlistAffected = playlists.find(
      (playlist) => playlist.tracks.find(
        (track) => track.title === trackTitle
      )
    );
    return playlistAffected;
  }

  findTrackInList = ( tracks, trackTitle ) => {
    return tracks.find((track) => track.title === trackTitle);
  }

  toggleFavorite = ( trackTitle ) => {
    // find the specific playlist
    const { playlists } = this.state;
    const playlistAffected = this.findListWithTrack( playlists, trackTitle );

    // find specific track in playlist
    const { tracks } = playlistAffected;
    const trackToToggle = this.findTrackInList( tracks, trackTitle );

    // toggle favorite
    trackToToggle.favorite = !Boolean(trackToToggle.favorite);

    // save and re-render
    playlistAffected.tracks = tracks;
    this.setState( { playlists: playlists } );
  }

  moveToTop = ( trackTitle ) => {
    // find the specific playlist
    const { playlists } = this.state;
    const playlistAffected = this.findListWithTrack( playlists, trackTitle );

    // find specific track in playlist
    const { tracks } = playlistAffected;
    const trackToMove = this.findTrackInList( tracks, trackTitle );

    // if the track is not already at top of the list
    if ( tracks[0].title !== trackTitle ) {
      // move that track to top of the list:
      // remove item
      let filteredTracks = tracks.filter(track => track.title !== trackTitle);
      // add back to beginning
      filteredTracks.unshift(trackToMove);
      playlistAffected.tracks = filteredTracks;
    }

    this.setState( { playlists: playlists } );
  }

  swapList = ( trackTitle ) => {
    console.log(trackTitle, 'reached RadioSet!');

    // find playlist
    // find track
    // delete track from playlist
    // add track to beginning of other playlist
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
          swapListCallback={ this.swapList }
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