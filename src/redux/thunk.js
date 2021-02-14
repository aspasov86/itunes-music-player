import axios from 'axios';
import { uniqBy } from 'lodash';

const fetchTracks = async searchTerm => axios.get(`/search/?term="${searchTerm}"`);

const searchForTracks = searchTerm => async (dispatch) => {
  dispatch({ type: 'SEARCH_INIT', payload: searchTerm });
  let tracks = [];
  try {
    const res = await fetchTracks(searchTerm);
    tracks = uniqBy(res.data.results, 'trackId').filter(({ trackId }) => trackId);
  } finally {
    dispatch({ type: 'SET_TRACKS', payload: tracks });
  }
};

export default searchForTracks;
