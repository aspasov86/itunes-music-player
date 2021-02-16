import { persistReducer } from 'redux-persist';
import { orderBy } from 'lodash';
import storage from 'redux-persist/lib/storage';
import {
  SEARCH_INIT, SET_TRACKS, CLEAR, SORT
} from './actions';

const initialState = {
  searchTerm: '',
  loading: false,
  noResults: false,
  sortBy: 'trackPrice',
  sortType: 'desc',
  tracks: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_INIT:
      return {
        ...state,
        searchTerm: action.payload,
        loading: true,
        noResults: false,
        tracks: []
      };
    case SET_TRACKS:
      return {
        ...state,
        loading: false,
        noResults: !action.payload.tracks.length && !action.payload.error,
        tracks: orderBy(action.payload.tracks, [state.sortBy], [state.sortType])
      };
    case SORT:
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortType: action.payload.sortType,
        tracks: orderBy(state.tracks, [action.payload.sortBy], [action.payload.sortType])
      };
    case CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default persistReducer({
  key: 'search',
  storage,
  whitelist: ['searchTerm', 'tracks', 'sortBy', 'sortType', 'noResults']
}, rootReducer);
