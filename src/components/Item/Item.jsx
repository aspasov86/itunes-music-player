/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import CoverImage from '../CoverImage/CoverImage';
import InfoLine from '../InfoLine/InfoLine';
import styles from './Item.module.scss';

const Item = ({ track, itemClickHandler }) => (
  <div
    className={styles.track}
    key={track.trackId}
    onClick={itemClickHandler(track.trackId)}
  >
    <CoverImage src={track.artworkUrl100} />
    <div className={styles.elipsis}>
      <InfoLine info={track.trackName} />
      <InfoLine info={track.collectionName} />
      <InfoLine info={track.artistName} />
      <div>
        <InfoLine info={track.primaryGenreName} htmlTag="span" />
        <span> &#9733; </span>
        <InfoLine info={track.releaseDate} htmlTag="span" type="date" />
      </div>
      <InfoLine info={track.trackTimeMillis} type="duration" />
      <InfoLine info={track.trackPrice} type="price" />
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
