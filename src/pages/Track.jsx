import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const getLargerImage = (src) => {
  const splitSrc = src.split('/');
  splitSrc[splitSrc.length - 1] = '550x550bb.jpg';
  return splitSrc.join('/');
};

const CoverImage = ({ src }) => {
  const [loaded, setLoaded] = useState(false);
  const onLoad = () => setLoaded(true);
  return (
    <>
      <div style={{
        display: loaded ? 'none' : 'block', width: 550, height: 550, textAlign: 'center'
      }}
      >
        Loading...
      </div>
      <img src={src} alt="cover" onLoad={onLoad} style={{ display: loaded ? 'inline-block' : 'none' }} />
    </>
  );
};

CoverImage.propTypes = { src: PropTypes.string.isRequired };

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
    <div style={{
      background: 'lightgray',
      clipPath: 'polygon(100% 10%, 0% 100%, 100% 100%)'
    }}
    >
      <button type="button" onClick={onBack}>Back to Search</button>
      <div>
        <div>{selectedTrack.trackName}</div>
      </div>
      <div style={{ width: 580 }}>
        <AudioPlayer
          header={(
            <div style={{ textAlign: 'center' }}>
              <CoverImage src={getLargerImage(selectedTrack.artworkUrl100)} />
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
