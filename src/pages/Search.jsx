/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import { useSelector, useDispatch } from 'react-redux';
import searchForTracks from '../redux/thunk';
import { CLEAR } from '../redux/actions';
import CoverImage from '../components/CoverImage/CoverImage';
import styles from './Search.module.scss';

const SearchPage = ({ history }) => {
  const [searchString, setSearchString] = useState('');
  const { searchTerm, tracks, loading } = useSelector(store => store);
  const dispatch = useDispatch();

  useEffect(() => {
    setSearchString(searchTerm);
  }, []);

  useEffect(() => {
    if (!searchString && !searchTerm) dispatch({ type: CLEAR });
  }, [searchString, searchTerm]);

  const onClick = trackId => () => history.push(`/track/${trackId}`);
  const onSearchChange = event => setSearchString(event.target.value);
  const onSearch = () => dispatch(searchForTracks(searchString));
  return (
    <div>
      <div style={{ height: '5vh', marginLeft: '.3rem' }}>
        <Input
          className={styles.input}
          size="big"
          value={searchString}
          icon={{
            name: 'search',
            disabled: !searchString,
            size: 'large',
            link: true,
            onClick: onSearch
          }}
          onChange={onSearchChange}
          placeholder="Search..."
        />
      </div>
      <div style={{ height: '87vh', overflowY: 'scroll', margin: '1rem .3rem' }}>
        {loading && 'Loading...'}
        {tracks && (
          <div>
            {tracks.map(track => (
              <div
                className={styles.track}
                style={{ display: 'flex', marginBottom: '.5rem' }}
                key={track.trackId}
                onClick={onClick(track.trackId)}
              >
                <CoverImage src={track.artworkUrl100} />
                <div style={{ marginLeft: '.5rem' }}>
                  <div>{track.trackName}</div>
                  <div style={{
                    width: 250, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'
                  }}
                  >
                    {track.collectionName}
                  </div>
                  <div>{track.artistName}</div>
                  <div>
                    <span>{track.primaryGenreName}</span>
                    <span> - </span>
                    <span>{moment(tracks[0].releaseDate).format('MM/DD/YYYY')}</span>
                  </div>
                  <div>{moment(track.trackTimeMillis).format('mm:ss')}</div>
                  <div>
                    $
                    {track.trackPrice}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

SearchPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

export default SearchPage;
