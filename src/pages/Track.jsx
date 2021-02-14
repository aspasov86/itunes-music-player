import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const getLargerImage = (src) => {
  const splitSrc = src.split('/');
  splitSrc[splitSrc.length - 1] = '550x550bb.jpg';
  return splitSrc.join('/');
};

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
    <div>
      <button type="button" onClick={onBack}>Back to Search</button>
      <div>
        <div>{selectedTrack.trackName}</div>
      </div>
      <div style={{ width: 700 }}>
        <AudioPlayer
          header={(
            <div style={{ textAlign: 'center' }}>
              <img src={getLargerImage(selectedTrack.artworkUrl100)} alt="cover" />
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
