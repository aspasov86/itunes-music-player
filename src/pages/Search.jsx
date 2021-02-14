import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const Search = ({ history }) => {
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    axios.get('/search/?term="nirvana"').then(res => setSongs(res.data.results));
  }, []);
  const onClick = trackName => () => history.push(`/track/${trackName}`);
  return songs.map(song => (
    <div key={song.trackId}>
      <button
        onClick={onClick(song.trackName)}
        type="button"
      >
        {song.trackName}
      </button>
    </div>
  ));
};

Search.propTypes = {
  history: PropTypes.shape({}).isRequired
};

export default Search;
