import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './Details.module.scss';

const Details = ({ track }) => (
  <div>
    <div className={styles.trackName}>{track.trackName}</div>
    <div>{track.collectionName}</div>
    <div>{track.artistName}</div>
    <div>
      <span>{track.primaryGenreName}</span>
      <span> - </span>
      <span>{moment(track.releaseDate).format('MM/DD/YYYY')}</span>
    </div>
  </div>
);

Details.propTypes = {
  track: PropTypes.shape({
    trackName: PropTypes.string,
    collectionName: PropTypes.string,
    artistName: PropTypes.string,
    primaryGenreName: PropTypes.string,
    releaseDate: PropTypes.string
  }).isRequired
};

export default Details;
