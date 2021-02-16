import PropTypes from 'prop-types';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import { useSelector, useDispatch } from 'react-redux';
import searchForTracks from '../redux/thunk';
import Search from '../components/Search/Search';
import Sort from '../components/Sort/Sort';
import Item from '../components/Item/Item';
import styles from './Search.module.scss';

const SearchPage = ({ history }) => {
  const {
    searchTerm, tracks, loading, searchPerformed
  } = useSelector(store => store);
  const dispatch = useDispatch();

  const itemClickHandler = trackId => () => history.push(`/track/${trackId}`);
  const searchHandler = searchString => () => dispatch(searchForTracks(searchString));
  return (
    <div>
      <div className={styles.toolRow}>
        <Search
          searchTerm={searchTerm}
          loading={loading}
          searchHandler={searchHandler}
        />
        <Sort />
      </div>
      <div className={styles.list}>
        {!tracks.length && searchPerformed && <Segment basic>No results found</Segment>}
        {tracks && tracks.map(track => <Item key={track.trackId} track={track} itemClickHandler={itemClickHandler} />)}
      </div>
    </div>
  );
};

SearchPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

export default SearchPage;
