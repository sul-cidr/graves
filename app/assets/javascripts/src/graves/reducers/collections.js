

import createReducer from '../utils/create-reducer';

import {
  REQUEST_COLLECTIONS,
  RECEIVE_COLLECTIONS,
  HIGHLIGHT_COLLECTION,
  UNHIGHLIGHT_COLLECTION,
  SELECT_COLLECTION,
} from '../constants';


const initialState = {
  loading: false,
  features: [],
  highlighted: null,
  selected: null,
};


const handlers = {

  [REQUEST_COLLECTIONS]: (state, action) => ({
    loading: true,
  }),

  [RECEIVE_COLLECTIONS]: (state, action) => ({
    features: action.geojson.features,
    loading: false,
  }),

  [HIGHLIGHT_COLLECTION]: (state, action) => ({
    highlighted: action.id,
  }),

  [UNHIGHLIGHT_COLLECTION]: (state, action) => ({
    highlighted: null,
  }),

  [SELECT_COLLECTION]: (state, action) => ({
    selected: action.id,
  }),

};


export default createReducer(initialState, handlers);
