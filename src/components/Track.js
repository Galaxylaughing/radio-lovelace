import React from 'react'
import PropTypes from 'prop-types'

import "./styles/Track.css";

// Here we use destructuring to extract the props into separate variables
// See https://wesbos.com/destructuring-objects/
const Track = ( { title, artist, playtime, albumart, favorite, toggleFavoriteCallback, moveToTopCallback, swapListCallback } ) => {
  const onCheckboxChange = () => {
    toggleFavoriteCallback( title );
  }

  const onMoveToTopClick = () => {
    moveToTopCallback( title );
  }

  const onSwapListClick = () => {
    swapListCallback( title );
  }
  
  return (
    <li className="track">
      <img className="track--albumart" alt={ `album art for ${ title }` } src={ albumart } />
      <h3 className="track--title">{ title }</h3>
      <input
        type="checkbox"
        className="track--favorite"
        defaultChecked={ favorite }
        onChange={ onCheckboxChange }
      />
      <p className="track--artist">{ artist }</p>
      <p className="track--playtime">{ playtime }</p>
      <button
        className="track--control track--to-top"
        onClick={ onMoveToTopClick }
        >
        <span role="img" aria-label="send to top">🔝</span>
      </button>
      <button
        className="track--control track--switch"
        onClick={ onSwapListClick }
        >
        <span role="img" aria-label="switch lists">↔</span>
      </button>
    </li>
  );
};

Track.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string,
  playtime: PropTypes.string,
  albumart: PropTypes.string,
  favorite: PropTypes.bool,
  toggleFavoriteCallback: PropTypes.func.isRequired,
  moveToTopCallback: PropTypes.func.isRequired,
  swapListCallback: PropTypes.func.isRequired,
}

export default Track;
