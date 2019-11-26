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

  trackElements = () => {
    return this.state.tracks.map((track, i) => {
      // We use "spread syntax" here to pass in all the properties of 
      // the variable 'track' as props. Go look it up!
      return (
        <Track
          key={track.id}
          {...track}
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
