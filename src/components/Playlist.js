import React from 'react'
import PropTypes from 'prop-types'
import './styles/Playlist.css';

import Track from './Track';

const calculatePlayTime = (tracks) => {
  let minutes = 0;
  let seconds = 0;
  tracks.forEach((track) => {
    const times = track.playtime.split(':');
    minutes += parseInt(times[0]);
    seconds += parseInt(times[1]);
  });

  minutes += Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  seconds %= 60;
  minutes %= 60;

  seconds = ("" + seconds).padStart(2, "0");
  minutes = ("" + minutes).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.trackCount = props.tracks.length;
    this.playtime = calculatePlayTime(props.tracks);
    this.state = {
      tracks: props.tracks,
    }
  }

  toggleFavorite = (trackTitle) => {
    // find specific track
    const { tracks } = this.state;
    const trackToToggle = tracks.find((track) => track.title === trackTitle);
    // toggle favorite
    trackToToggle.favorite = !Boolean(trackToToggle.favorite);
    // save and re-render
    this.setState( { tracks: tracks } );
  }

  moveToTop = ( trackTitle ) => {
    // find specific track
    const { tracks } = this.state;
    const trackToMove = tracks.find( ( track ) => track.title === trackTitle );

    // if the track is not already at top of the list
    if ( tracks[0].title !== trackTitle ) {
      // move that track to top of the list:
      // slice out item
      const trackIndex = tracks.indexOf(trackToMove);
      tracks.splice(trackIndex, 1);
      // add back to beginning
      tracks.unshift(trackToMove);
    }
    // save and re-render
    this.setState( {tracks: tracks } );
  }

  trackElements = () => {
    return this.state.tracks.map((track, i) => {
      // We use "spread syntax" here to pass in all the properties of 
      // the variable 'track' as props. Go look it up!
      return (
        <Track
          key={track.id}
          {...track}
          toggleFavoriteCallback={ this.toggleFavorite }
          moveToTopCallback={ this.moveToTop }
        />
      );
    });
  }

  render() {
    return (
      <div className="playlist">
        <h2>{this.side} Playlist</h2>
        <p>
          {this.trackCount} tracks - {this.playtime}
        </p>
        <ul className="playlist--track-list">
          {this.trackElements()}
        </ul>
      </div>
    );
  }
}

Playlist.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    playtime: PropTypes.string.isRequired,
    albumart: PropTypes.string,
    favorite: PropTypes.bool,
  })).isRequired,
  side: PropTypes.string.isRequired,
}

export default Playlist;
