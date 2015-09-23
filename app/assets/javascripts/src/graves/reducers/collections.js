

import createReducer from '../utils/create-reducer';

import {
  REQUEST_COLLECTIONS,
  RECEIVE_COLLECTIONS,
  RENDER_COLLECTIONS,
  HIGHLIGHT_COLLECTION,
  UNHIGHLIGHT_COLLECTION,
} from '../constants';


const initialState = {
  loading: false,
  features: [],
  highlighted: null,
  layers: {},
};


const handlers = {

  [REQUEST_COLLECTIONS]: (state, action) => ({
    loading: true,
  }),

  [RECEIVE_COLLECTIONS]: (state, action) => ({
    features: action.geojson.features,
    loading: false,
  }),

  [RENDER_COLLECTIONS]: (state, action) => ({
    layers: action.layers,
  }),

  [HIGHLIGHT_COLLECTION]: (state, action) => ({
    highlighted: action.id,
  }),

  [UNHIGHLIGHT_COLLECTION]: (state, action) => ({
    highlighted: null,
  }),

};


export default createReducer(initialState, handlers);
