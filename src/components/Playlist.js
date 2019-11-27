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

const Playlist = (props) => {
  const tracks = props.tracks;
  const trackCount = tracks.length;
  const playtime = calculatePlayTime(tracks);

  const toggleFavoriteCallback = (playlist, trackTitle) => {
    props.toggleFavoriteCallback(playlist, trackTitle);
  }

  const moveToTopCallback = (playlist, trackTitle) => {
    props.moveToTopCallback(playlist, trackTitle);
  }

  const swapListCallback = (playlist, trackTitle) => {
    props.swapListCallback(playlist, trackTitle);
  }

  const trackElements = tracks.map((track, i) => {
    // We use "spread syntax" here to pass in all the properties of 
    // the variable 'track' as props. Go look it up!
    return (
      <Track
        key={track.id}
        {...track}
        playlistName={ props.side }
        toggleFavoriteCallback={ toggleFavoriteCallback }
        moveToTopCallback={ moveToTopCallback }
        swapListCallback={ swapListCallback }
      />
    );
  });

  return (
    <div className="playlist">
      <h2>{props.side} Playlist</h2>
      <p>
        {trackCount} tracks - {playtime}
      </p>
      <ul className="playlist--track-list">
        {trackElements}
      </ul>
    </div>
  );
}

Playlist.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    playtime: PropTypes.string.isRequired,
    seconds: PropTypes.number,
    albumart: PropTypes.string,
    favorite: PropTypes.bool,
    playlistName: PropTypes.string,
  })).isRequired,
  side: PropTypes.string.isRequired,
  toggleFavoriteCallback: PropTypes.func.isRequired,
  moveToTopCallback: PropTypes.func.isRequired,
  swapListCallback: PropTypes.func.isRequired,
}

export default Playlist;
