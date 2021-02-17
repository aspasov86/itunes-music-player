import uniqBy from 'lodash.uniqby';
import { SEARCH_INIT, SET_TRACKS } from './actions';
import fetchTracks from '../services/service';

const searchForTracks = searchTerm => async (dispatch) => {
  dispatch({ type: SEARCH_INIT, payload: searchTerm });
  let tracks = [];
  let error = false;
  try {
    const results = await fetchTracks(searchTerm);
    // Removing anything other than tracks (audiobooks etc)
    // as track page is based on the trackIds
    // Example: audiobooks do not have id
    // Also preventing track duplicates (there were cases)
    tracks = uniqBy(results.filter(({ trackId }) => trackId), 'trackId');
  } catch (e) {
    error = true;
  } finally {
    dispatch({ type: SET_TRACKS, payload: { tracks, error } });
  }
};

export default searchForTracks;
