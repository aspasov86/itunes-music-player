import PropTypes from 'prop-types';
import moment from 'moment';
import InfoLine from '../InfoLine/InfoLine';
import styles from './Details.module.scss';

const Details = ({ track }) => (
  <div>
    <InfoLine className={styles.trackName} info={track.trackName} />
    <InfoLine info={track.collectionName} />
    <InfoLine info={track.artistName} />
    <div>
      <InfoLine info={track.primaryGenreName} htmlTag="span" />
      <span>{track.primaryGenreName}</span>
      <span> - </span>
      <InfoLine info={moment(track.releaseDate).format('MM/DD/YYYY')} htmlTag="span" type="date" />
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
