import { useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function useTracksData(tracks, trackIdParam) {
  const history = useHistory();
  const trackNum = useMemo(() => tracks.findIndex((({ trackId }) => trackId === +trackIdParam)), [trackIdParam]);
  const goBack = () => history.push('/search');

  useEffect(() => {
    if (trackNum < 0) goBack();
  }, [trackNum]);

  const selectedTrack = useMemo(() => (trackNum < 0 ? {} : tracks[trackNum]), [trackNum]);
  const nextTrackId = useMemo(() => {
    let trackId = null;
    if (trackNum > -1) {
      console.log('trackNum', trackNum);
      console.log('tracks.length', tracks.length);
      trackId = (trackNum + 1 === tracks.length ? tracks[0].trackId : tracks[trackNum + 1].trackId);
    }
    return trackId;
  }, [trackNum]);
  const previousTrackId = useMemo(() => {
    let trackId = null;
    if (trackNum > -1) {
      trackId = (!trackNum ? tracks[tracks.length - 1].trackId : tracks[trackNum - 1].trackId);
    }
    return trackId;
  }, [trackNum]);

  return {
    selectedTrack,
    onClickNext: () => (nextTrackId ? history.push(`/track/${nextTrackId}`) : null),
    onClickPrevious: () => (nextTrackId ? history.push(`/track/${previousTrackId}`) : null),
    goBack
  };
}

export default useTracksData;
