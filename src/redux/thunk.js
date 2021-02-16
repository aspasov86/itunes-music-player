import uniqBy from 'lodash.uniqby';
import { SEARCH_INIT, SET_TRACKS } from './actions';
import fetchTracks from '../services/service';

const searchForTracks = searchTerm => async (dispatch) => {
  dispatch({ type: SEARCH_INIT, payload: searchTerm });
  let tracks = [];
  let error = false;
  try {
    const results = await fetchTracks(searchTerm);
    tracks = uniqBy(results.filter(({ trackId }) => trackId), 'trackId');
  } catch (e) {
    error = true;
  } finally {
    dispatch({ type: SET_TRACKS, payload: { tracks, error } });
  }
};

export default searchForTracks;
