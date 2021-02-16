/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import moment from 'moment';
import CoverImage from '../CoverImage/CoverImage';
import styles from './Item.module.scss';

const Item = ({ track, itemClickHandler }) => (
  <div
    className={styles.track}
    key={track.trackId}
    onClick={itemClickHandler(track.trackId)}
  >
    <CoverImage src={track.artworkUrl100} />
    <div className={styles.elipsis250}>
      <div>{track.trackName}</div>
      <div>
        {track.collectionName}
      </div>
      <div>{track.artistName}</div>
      <div>
        <span>{track.primaryGenreName}</span>
        <span> - </span>
        <span>{moment(track.releaseDate).format('MMMM DD, YYYY')}</span>
      </div>
      <div>{moment(track.trackTimeMillis).format('mm:ss')}</div>
      <div>
        {track.trackPrice ? `$${track.trackPrice}` : '[No info]'}
      </div>
    </div>
  </div>
);

Item.propTypes = {
  track: PropTypes.shape({
    trackId: PropTypes.number,
    artworkUrl100: PropTypes.string,
    trackName: PropTypes.string,
    collectionName: PropTypes.string,
    artistName: PropTypes.string,
    primaryGenreName: PropTypes.string,
    releaseDate: PropTypes.string,
    trackTimeMillis: PropTypes.number,
    trackPrice: PropTypes.number
  }).isRequired,
  itemClickHandler: PropTypes.func.isRequired
};

export default Item;
