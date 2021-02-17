import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup/Popup';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import { useDispatch, useSelector } from 'react-redux';
import useScreenWidth from '../../hooks/screenWidth/useScreenWidth';
import SortControl from './SortControl';
import { SORT } from '../../redux/actionTypes';
import { ASCENDING, DESCENDING } from '../../constants/constants';
import styles from './Sort.module.scss';

const Sort = () => {
  const sortBy = useSelector(store => store.sortBy);
  const sortType = useSelector(store => store.sortType);
  const { isMobileDevice, isTabletDevice } = useScreenWidth();
  const dispatch = useDispatch();
  const onSortTypeChange = () => dispatch({
    type: SORT,
    payload: { sortType: sortType === DESCENDING ? ASCENDING : DESCENDING, sortBy }
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

  return (isMobileDevice || isTabletDevice) ? (
    <Popup
      on="click"
      hoverable
      position="bottom right"
      trigger={(
        <Button
          data-testid="sort"
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
