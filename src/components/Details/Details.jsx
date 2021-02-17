import PropTypes from 'prop-types';
import InfoLine from '../InfoLine/InfoLine';
import styles from './Details.module.scss';

const Details = ({ track }) => (
  <div className="trackDetails">
    <div>
      <div className="trackLabel">Track name</div>
      <InfoLine className={styles.trackName} info={track.trackName} />
    </div>
    <div>
      <div className="trackLabel">Album</div>
      <InfoLine info={track.collectionName} className="collectionName" />
    </div>
    <div>
      <div className="trackLabel">Artist</div>
      <InfoLine info={track.artistName} className="artistName" />
    </div>
    <div>
      <div className="trackLabel">Genre / Release date</div>
      <div className="genreReleaseDate">
        <InfoLine info={track.primaryGenreName} htmlTag="span" />
        <span> &#x2606; </span>
        <InfoLine info={track.releaseDate} htmlTag="span" type="date" />
      </div>
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
