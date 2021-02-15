import PropTypes from 'prop-types';
import moment from 'moment';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import CoverImage from '../components/CoverImage/CoverImage';
import 'react-h5-audio-player/lib/styles.css';

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          onClick={onBack}
          basic
          content="Back to Search"
          icon={<Icon name="play" flipped="horizontally" />}
          labelPosition="left"
          size="tiny"
        />
        <Icon name="sound" size="large" />
      </div>
      <div style={{ margin: '1rem 0' }}>
        <AudioPlayer
          header={(
            <div>
              <CoverImage src={selectedTrack.artworkUrl100} size={250} />
            </div>
          )}
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
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{selectedTrack.trackName}</div>
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
