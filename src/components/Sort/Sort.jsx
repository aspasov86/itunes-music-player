import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup/Popup';
import { useDispatch, useSelector } from 'react-redux';
import { SORT } from '../../redux/actions';
import styles from './Sort.module.scss';

const Sort = () => {
  const sortBy = useSelector(store => store.sortBy);
  const sortType = useSelector(store => store.sortType);
  const dispatch = useDispatch();
  const onSortTypeChange = () => dispatch({
    type: SORT,
    payload: { sortType: sortType === 'desc' ? 'asc' : 'desc', sortBy }
  });
  const onSortByChange = (event, { value }) => dispatch({ type: SORT, payload: { sortBy: value, sortType } });
  return (
    <Popup
      on="click"
      hoverable
      position="bottom right"
      trigger={(
        <Button
          icon="sort amount up"
          className={styles.btn}
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
            value={sortBy}
            onChange={onSortByChange}
          />
          <Button
            icon={`long arrow alternate ${sortType === 'asc' ? 'down' : 'up'}`}
            onClick={onSortTypeChange}
            className={styles.btn}
          />
        </div>
        )}
    />
  );
};

export default Sort;
