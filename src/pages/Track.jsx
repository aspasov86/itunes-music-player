import PropTypes from 'prop-types';
import { useMemo, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Track = ({ match, history }) => {
  const tracks = useSelector(store => store.tracks);
  const trackNum = useMemo(() => tracks.findIndex((({ trackId }) => trackId === +match.params.trackId)), [match.params.trackId]);
  const selectedTrack = useMemo(() => tracks[trackNum], [trackNum]);
  const nextTrack = useMemo(() => (!tracks[trackNum + 1] ? tracks[0].trackId : tracks[trackNum + 1].trackId), [trackNum]);
  const onNext = () => history.push(`/track/${nextTrack}`);
  const onBack = () => history.push('/search');
  const audio = useRef(null);
  useEffect(() => { audio.current.load(); }, [trackNum]);
  return (
    <div>
      <button type="button" onClick={onBack}>Back to Search</button>
      <div>
        <div>{selectedTrack.trackName}</div>
      </div>
      <div>
        <audio controls ref={audio} crossOrigin="anonymous" autoPlay>
          <track kind="captions" />
          <source src={selectedTrack.previewUrl} type="audio/mp4" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <button type="button" onClick={onNext}>Next</button>
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
