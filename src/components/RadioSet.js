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

  calculateSeconds = (track) => {
    let minutes = 0;
    let seconds = 0;

    const times = track.playtime.split(':');
    minutes += parseInt(times[0]);
    seconds += parseInt(times[1]);
  
    seconds += Math.floor(minutes * 60);
  
    track.seconds = seconds;
    return seconds;
  }

  calculateAllSeconds = (tracks) => {
    tracks.forEach((track) => {
      this.calculateSeconds(track);
    });
    return tracks;
  }

  calcTracks = () => {
    // const morningTracks = this.props.tracks.slice(0, this.props.tracks.length / 2);
    // const eveningTracks = this.props.tracks.slice(this.props.tracks.length / 2, this.props.tracks.length);
    

    // Instead of splitting the list of tracks down the middle, 
    // write some code that splits the list **in two**
    // so that the play times are as close as possible.

    // What is the time complexity of your code? What is n?
    // -> 
    // this.calculateAllSeconds is O(n) where n is the number of tracks,
    // tracks.sort in Chrome appears to be quicksort, 
    //     (https://learnersbucket.com/examples/array/how-to-use-array-sort-in-javascript/)
    //     so O(n^2) at worst but O(n log n) average.
    //     Firefox apparently uses mergesort, at least as of January 2019
    //     (https://stackoverflow.com/questions/234683/javascript-array-sort-implementation)
    //     so in Firefox it would always be O(n log n).
    // the while loop is also O(n) where n is the number of tracks
    //     (though it jumps in groups of four).

    // so I think the total time complexity is O(3n^2) at worse, 
    //     or O(n^2) without the constant (in Chrome),
    //     and O(3n log n) on average (or in Firefox), 
    //     or O(n log n) without the constant


    // calculate comparable runtime for all tracks
    const tracks = this.calculateAllSeconds( this.props.tracks );
    // sort the tracks by runtime, in descending order
    const sortedTracks = tracks.sort( ( a, b ) => b.seconds - a.seconds );
    

    // assign alternating tracks to the playlists
    // let morningTracks = [];
    // let eveningTracks = [];
    // for ( const trackIndex in sortedTracks ) {
    //   if ( trackIndex % 2 === 0 ) {
    //     morningTracks.push( sortedTracks[ trackIndex ] );
    //   } else {
    //     eveningTracks.push( sortedTracks[ trackIndex ] );
    //   }
    // }
    // => 43 tracks, 4:46:45
    // => 43 tracks, 4:08:59


    // put longest track into morning
    let morningTracks = [ sortedTracks[ 0 ] ];
    let eveningTracks = [];

    let trackIndex = 1;
    while( trackIndex <= sortedTracks.length ) {

      // put next two longest tracks into evening
      // so evening gets the second-longest,
      // and then the first-longest of the remaining
      if (sortedTracks[ trackIndex ]) {
      eveningTracks.push( sortedTracks[ trackIndex ] )
      } 
      if (sortedTracks[ trackIndex + 1 ]) {
      eveningTracks.push( sortedTracks[ trackIndex + 1 ] )
      }

      // put next two longest tracks into morning
      if (sortedTracks[ trackIndex + 2 ]) {
      morningTracks.push( sortedTracks[ trackIndex + 2 ] )
      }
      if (sortedTracks[ trackIndex + 3 ]) {
      morningTracks.push( sortedTracks[ trackIndex + 3 ] )
      }

      trackIndex += 4;
    }
    // => 43 tracks, 4:42:50
    // => 43 tracks, 4:12:54

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