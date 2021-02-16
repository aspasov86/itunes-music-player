import PropTypes from 'prop-types';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import { ASCENDING, DESCENDING } from '../../constants/constants';
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
      icon={`long arrow alternate ${sortType === ASCENDING ? 'down' : 'up'}`}
      onClick={onSortTypeChange}
      className={styles.sortTypeBtn}
    />
  </div>
);

SortControl.propTypes = {
  sortBy: PropTypes.oneOf(['trackTimeMillis', 'trackPrice', 'primaryGenreName']).isRequired,
  onSortByChange: PropTypes.func.isRequired,
  sortType: PropTypes.oneOf([ASCENDING, DESCENDING]).isRequired,
  onSortTypeChange: PropTypes.func.isRequired
};

export default SortControl;
