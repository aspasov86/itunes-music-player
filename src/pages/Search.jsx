import PropTypes from 'prop-types';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import { useSelector, useDispatch } from 'react-redux';
import searchForTracks from '../redux/thunk';
import Search from '../components/Search/Search';
import Sort from '../components/Sort/Sort';
import Item from '../components/Item/Item';
import CardItem from '../components/Item/CardItem';
import useScreenWidth from '../hooks/screenWidth/useScreenWidth';
import Layout from '../components/Layout/Layout';
import styles from './Search.module.scss';

const SearchPage = ({ history }) => {
  const {
    searchTerm, tracks, loading, noResults
  } = useSelector(store => store);
  const { isLaptopDevice, isDesktopDevice } = useScreenWidth();
  const dispatch = useDispatch();

  const itemClickHandler = trackId => () => history.push(`/track/${trackId}`);
  const searchHandler = searchString => () => dispatch(searchForTracks(searchString));

  return (
    <Layout>
      <div className={styles.toolRow}>
        <Search
          searchTerm={searchTerm}
          loading={loading}
          searchHandler={searchHandler}
        />
        <Sort />
      </div>
      <div className={styles.list}>
        {noResults && <Segment basic>No results found</Segment>}
        {tracks && tracks.map(track => ((isLaptopDevice || isDesktopDevice) ? (
          <CardItem
            key={track.trackId}
            track={track}
            itemClickHandler={itemClickHandler}
          />
        ) : (
          <Item
            key={track.trackId}
            track={track}
            itemClickHandler={itemClickHandler}
          />
        )))}
      </div>
    </Layout>
  );
};

SearchPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

export default SearchPage;
