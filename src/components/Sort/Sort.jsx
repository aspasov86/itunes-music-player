import PropTypes from 'prop-types';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup/Popup';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import { useDispatch, useSelector } from 'react-redux';
import useScreenWidth from '../../hooks/screenWidth/useScreenWidth';
import { SORT } from '../../redux/actions';
import styles from './Sort.module.scss';

const SortControl = ({
  sortBy, onSortByChange, sortType, onSortTypeChange
}) => (
  <div className={styles.multi}>
    <div className="textWrap">
      <div className={styles.sortBy}>Sort by</div>
      <Dropdown
        inline
        options={[
          { key: 'trackTimeMillis', text: 'length', value: 'trackTimeMillis' },
          { key: 'trackPrice', text: 'price', value: 'trackPrice' },
          { key: 'primaryGenreName', text: 'genre', value: 'primaryGenreName' }
        ]}
        value={sortBy}
        onChange={onSortByChange}
      />
    </div>
    <Button
      icon={`long arrow alternate ${sortType === 'asc' ? 'down' : 'up'}`}
      onClick={onSortTypeChange}
      className={styles.sortTypeBtn}
    />
  </div>
);

SortControl.propTypes = {
  sortBy: PropTypes.oneOf(['trackTimeMillis', 'trackPrice', 'primaryGenreName']).isRequired,
  onSortByChange: PropTypes.func.isRequired,
  sortType: PropTypes.oneOf(['act', 'desc']).isRequired,
  onSortTypeChange: PropTypes.func.isRequired
};

const Sort = () => {
  const sortBy = useSelector(store => store.sortBy);
  const sortType = useSelector(store => store.sortType);
  const { isMobileDevice, isTabletDevice } = useScreenWidth();
  const dispatch = useDispatch();
  const onSortTypeChange = () => dispatch({
    type: SORT,
    payload: { sortType: sortType === 'desc' ? 'asc' : 'desc', sortBy }
  });
  const onSortByChange = (event, { value }) => dispatch({ type: SORT, payload: { sortBy: value, sortType } });

  const control = (
    <SortControl
      sortBy={sortBy}
      onSortByChange={onSortByChange}
      sortType={sortType}
      onSortTypeChange={onSortTypeChange}
    />
  );

  return isMobileDevice || isTabletDevice ? (
    <Popup
      on="click"
      hoverable
      position="bottom right"
      trigger={(
        <Button
          icon={<Icon name="sort amount up" size="large" />}
          className={styles.sortIcon}
        />
      )}
      closeOnPortalMouseLeave={false}
      content={control}
    />
  ) : control;
};

export default Sort;
