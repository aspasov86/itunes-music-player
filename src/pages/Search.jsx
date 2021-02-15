/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState, useEffect } from 'react';
import moment from 'moment';
import { orderBy } from 'lodash';
import PropTypes from 'prop-types';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup/Popup';
import { useSelector, useDispatch } from 'react-redux';
import searchForTracks from '../redux/thunk';
import { CLEAR } from '../redux/actions';
import CoverImage from '../components/CoverImage/CoverImage';
import styles from './Search.module.scss';

const SearchPage = ({ history }) => {
  const [searchString, setSearchString] = useState('');
  const {
    searchTerm, tracks, loading, searchPerformed
  } = useSelector(store => store);
  const [filterBy, setFilterBy] = useState('trackPrice');
  const [sortType, setSortType] = useState('desc');
  const [sortedTracks, setSortedTracks] = useState(tracks);
  const dispatch = useDispatch();

  useEffect(() => {
    setSearchString(searchTerm);
  }, []);

  useEffect(() => {
    setSortedTracks(orderBy(tracks, [filterBy], [sortType]));
  }, [tracks, filterBy, sortType]);

  useEffect(() => {
    if (!searchString && !searchTerm) dispatch({ type: CLEAR });
  }, [searchString, searchTerm]);

  const onClick = trackId => () => history.push(`/track/${trackId}`);
  const onSearchChange = event => setSearchString(event.target.value);
  const onSearch = () => dispatch(searchForTracks(searchString));

  const sortByHandler = () => setSortType(sortType === 'desc' ? 'asc' : 'desc');
  const filterByHandler = (event, { value }) => setFilterBy(value);
  return (
    <div>
      <div style={{
        height: '5vh', margin: '0 .3rem', display: 'flex', justifyContent: 'space-between'
      }}
      >
        <Input
          className={styles.input}
          size="big"
          loading={loading}
          value={searchString}
          icon={{
            name: 'search',
            disabled: !searchString,
            size: 'large',
            onClick: onSearch
          }}
          onChange={onSearchChange}
          placeholder="Search..."
        />
        <Popup
          on="click"
          hoverable
          position="bottom right"
          trigger={(
            <Button
              icon="sort amount up"
              style={{
                borderRadius: 0,
                background: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                marginRight: 0
              }}
            />
          )}
          closeOnPortalMouseLeave={false}
          content={(
            <div className={styles.multi}>
              <div className={styles.sortBy}>Sort by</div>
              <Dropdown
                inline
                options={[
                  { key: 'trackTimeMillis', text: 'length', value: 'trackTimeMillis' },
                  { key: 'trackPrice', text: 'price', value: 'trackPrice' },
                  { key: 'primaryGenreName', text: 'genre', value: 'primaryGenreName' }
                ]}
                value={filterBy}
                onChange={filterByHandler}
              />
              <Button
                icon={`long arrow alternate ${sortType === 'asc' ? 'down' : 'up'}`}
                onClick={sortByHandler}
                style={{
                  borderRadius: 0,
                  background: 'rgba(0, 0, 0, 0.6)',
                  color: 'white',
                  marginRight: 0
                }}
              />
            </div>
          )}
        />
      </div>
      <div
        style={{
          height: '85vh',
          overflowY: 'scroll',
          margin: '1vh .3rem 0'
        }}
      >
        <Icon
          name="sound"
          size="massive"
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -30%)',
            zIndex: -1,
            opacity: 0.2
          }}
        />
        <Icon
          name="music"
          size="massive"
          style={{
            position: 'absolute',
            top: '70%',
            left: '50%',
            transform: 'translate(-50%, -70%)',
            zIndex: -1,
            opacity: 0.2
          }}
        />
        {!tracks.length && searchPerformed && (
          <Segment basic>No results found</Segment>
        )}
        {tracks && (
          <div>
            {sortedTracks.map(track => (
              <div
                className={styles.track}
                style={{ display: 'flex', marginBottom: '.5rem' }}
                key={track.trackId}
                onClick={onClick(track.trackId)}
              >
                <CoverImage src={track.artworkUrl100} />
                <div style={{ marginLeft: '.5rem' }} className={styles.elipsis250}>
                  <div>{track.trackName}</div>
                  <div>
                    {track.collectionName}
                  </div>
                  <div>{track.artistName}</div>
                  <div>
                    <span>{track.primaryGenreName}</span>
                    <span> - </span>
                    <span>{moment(track.releaseDate).format('MM/DD/YYYY')}</span>
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
