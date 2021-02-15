import { uniqBy } from 'lodash';
import { SEARCH_INIT, SET_TRACKS } from './actions';
import fetchTracks from '../services/service';

const searchForTracks = searchTerm => async (dispatch) => {
  dispatch({ type: SEARCH_INIT, payload: searchTerm });
  let tracks = [];
  try {
    const results = await fetchTracks(searchTerm);
    tracks = uniqBy(results.filter(({ trackId }) => trackId), 'trackId');
  } finally {
    dispatch({ type: SET_TRACKS, payload: tracks });
  }
};

export default searchForTracks;
