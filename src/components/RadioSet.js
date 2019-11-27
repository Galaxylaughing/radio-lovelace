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

  findPlaylist = ( list, playlistSide ) => {
    return list.find((playlist) => playlist.side === playlistSide);
  }

  findTrackInList = ( tracks, trackTitle ) => {
    return tracks.find((track) => track.title === trackTitle);
  }

  removeTrackFromList = ( list, trackTitle ) => {
    return list.filter(track => track.title !== trackTitle );
  }

  toggleFavorite = ( playlistSide, trackTitle ) => {
    // find the specific playlist
    const { playlists } = this.state;
    const playlistAffected = this.findPlaylist( playlists, playlistSide );

    // find specific track in playlist
    const { tracks } = playlistAffected;
    const trackToToggle = this.findTrackInList( tracks, trackTitle );

    // toggle favorite
    trackToToggle.favorite = !Boolean(trackToToggle.favorite);

    // save and re-render
    playlistAffected.tracks = tracks;
    this.setState( { playlists: playlists } );
  }

  moveToTop = ( playlistSide, trackTitle ) => {
    // find the specific playlist
    const { playlists } = this.state;
    const playlistAffected = this.findPlaylist( playlists, playlistSide );

    // find specific track in playlist
    const { tracks } = playlistAffected;
    const trackToMove = this.findTrackInList( tracks, trackTitle );

    // if the track is not already at top of the list
    if ( tracks[0].title !== trackTitle ) {
      // move that track to top of the list:
      // remove item
      let filteredTracks = this.removeTrackFromList( tracks, trackTitle );
      // add back to beginning
      filteredTracks.unshift(trackToMove);
      playlistAffected.tracks = filteredTracks;
    }

    // save and re-render
    this.setState( { playlists: playlists } );
  }

  swapList = ( playlistSide, trackTitle ) => {
    // find the specific playlist
    const { playlists } = this.state;
    const playlistAffected = this.findPlaylist( playlists, playlistSide );

    // find specific track in playlist
    const { tracks } = playlistAffected;
    const trackToMove = this.findTrackInList( tracks, trackTitle );
    
    // delete track from playlist
    let filteredTracks = this.removeTrackFromList( tracks, trackTitle );
    playlistAffected.tracks = filteredTracks;

    // find new playlist
    let otherList = playlists.find((playlist) => playlist.side !== playlistAffected.side)
    // assign track to new playlist
    trackToMove.playlistName = otherList.side;
    // add track to beginning of other playlist
    otherList.tracks.unshift(trackToMove);

    // save and re-render
    this.setState( { playlists: playlists } );
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