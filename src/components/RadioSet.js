import React from 'react';
import "./styles/RadioSet.css";

import Playlist from './Playlist';

class RadioSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: {
        morningTracks: this.props.tracks.slice(0, this.props.tracks.length / 2),
        eveningTracks: this.props.tracks.slice(this.props.tracks.length / 2, this.props.tracks.length)
      },
    }
  }

  render() {
    console.log(`Radio set for ${this.props.tracks.length} tracks`);
    
    return (
      <div className="radio-set">
        <section className="radio-set--playlist-container">
          <Playlist
            side="Morning"
            tracks={this.state.playlists.morningTracks}
          />
          <Playlist
            side="Evening"
            tracks={this.state.playlists.eveningTracks}
          />
        </section>
      </div>
    );
  }
};

export default RadioSet;