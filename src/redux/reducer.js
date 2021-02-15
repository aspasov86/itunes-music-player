import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { SEARCH_INIT, SET_TRACKS, CLEAR } from './actions';

const initialState = {
  searchTerm: '',
  loading: false,
  searchPerformed: false,
  tracks: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_INIT:
      return {
        ...state,
        searchTerm: action.payload,
        loading: true,
        tracks: []
      };
    case SET_TRACKS:
      return {
        ...state,
        loading: false,
        searchPerformed: true,
        tracks: action.payload
      };
    case CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default persistReducer({ key: 'search', storage, whitelist: ['searchTerm', 'tracks'] }, rootReducer);
