import PropTypes from 'prop-types';
import moment from 'moment';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup/Popup';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon
} from 'react-share';
import CoverImage from '../components/CoverImage/CoverImage';
import 'react-h5-audio-player/lib/styles.css';
import styles from './Track.module.scss';

const Track = ({ match, history }) => {
  const tracks = useSelector(store => store.tracks);
  const trackNum = useMemo(() => tracks.findIndex((({ trackId }) => trackId === +match.params.trackId)), [match.params.trackId]);
  const selectedTrack = useMemo(() => tracks[trackNum], [trackNum]);
  const nextTrack = useMemo(() => (!tracks[trackNum + 1] ? tracks[0].trackId : tracks[trackNum + 1].trackId), [trackNum]);
  const previousTrack = useMemo(
    () => (!tracks[trackNum - 1] ? tracks[tracks.length - 1].trackId : tracks[trackNum - 1].trackId),
    [trackNum]
  );
  const onClickNext = () => history.push(`/track/${nextTrack}`);
  const onClickPrevious = () => history.push(`/track/${previousTrack}`);
  const onBack = () => history.push('/search');
  return (
    <div style={{ margin: '1rem' }}>
      <div className={styles.topLine}>
        <Button
          onClick={onBack}
          basic
          content="Back to Search"
          icon={<Icon name="play" flipped="horizontally" />}
          labelPosition="left"
          size="tiny"
        />
        <Popup
          on="click"
          hoverable
          position="bottom right"
          trigger={<Button content="Share" />}
          closeOnPortalMouseLeave={false}
          content={(
            <div className={styles.shareBtns}>
              <FacebookShareButton url={selectedTrack.trackViewUrl}>
                <FacebookIcon size={32} />
              </FacebookShareButton>
              <LinkedinShareButton url={selectedTrack.trackViewUrl}>
                <LinkedinIcon size={32} />
              </LinkedinShareButton>
              <TwitterShareButton url={selectedTrack.trackViewUrl}>
                <TwitterIcon size={32} />
              </TwitterShareButton>
            </div>
          )}
        />
      </div>
      <div style={{ margin: '1rem 0', border: '2px solid rgba(0,0,0,.6)' }}>
        <AudioPlayer
          header={<CoverImage src={selectedTrack.artworkUrl100} size={250} />}
          src={selectedTrack.previewUrl}
          volume={0.2}
          showSkipControls
          onClickPrevious={onClickPrevious}
          onClickNext={onClickNext}
          showJumpControls={false}
          customAdditionalControls={[]}
          crossOrigin="anonymous"
        />
      </div>
      <div>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', lineHeight: '1.5rem' }}>{selectedTrack.trackName}</div>
        <div>{selectedTrack.collectionName}</div>
        <div>{selectedTrack.artistName}</div>
        <div>
          <span>{selectedTrack.primaryGenreName}</span>
          <span> - </span>
          <span>{moment(selectedTrack.releaseDate).format('MM/DD/YYYY')}</span>
        </div>
      </div>
    </div>
  );
};

Track.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ trackId: PropTypes.string })
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired
};

export default Track;
