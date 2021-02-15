import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import searchForTracks from '../redux/thunk';
import { CLEAR } from '../redux/actions';

const Search = ({ history }) => {
  const [searchString, setSearchString] = useState('');
  const { searchTerm, tracks, loading } = useSelector(store => store);
  const dispatch = useDispatch();

  useEffect(() => {
    setSearchString(searchTerm);
  }, []);

  const onClick = trackId => () => history.push(`/track/${trackId}`);
  const onSearchChange = event => setSearchString(event.target.value);
  const onSearch = () => dispatch(searchForTracks(searchString));
  const onClear = () => {
    dispatch({ type: CLEAR });
    setSearchString('');
  };
  return (
    <>
      <div>
        <input value={searchString} onChange={onSearchChange} />
        <button type="button" onClick={onSearch} disabled={!searchString}>Search</button>
        <button type="button" onClick={onClear} disabled={!searchString}>Clear</button>
      </div>
      <div>
        {loading && 'Loading...'}
        {tracks.map(song => (
          <div key={song.trackId}>
            <button
              onClick={onClick(song.trackId)}
              type="button"
            >
              {song.trackName}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

Search.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

export default Search;
