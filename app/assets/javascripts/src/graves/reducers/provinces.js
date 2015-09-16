

import * as constants from '../constants';
import createReducer from '../utils/create-reducer';


const initialState = {
  loading: false,
  features: [],
  highlighted: null,
  layers: {},
};


const handlers = {

  [constants.REQUEST_PROVINCES]: (state, action) => ({
    loading: true,
  }),

  [constants.RECEIVE_PROVINCES]: (state, action) => ({
    features: action.features,
    loading: false,
  }),

  [constants.RENDER_PROVINCES]: (state, action) => ({
    layers: action.layers,
  }),

  [constants.HIGHLIGHT_PROVINCE]: (state, action) => ({
    highlighted: action.id,
  }),

  [constants.UNHIGHLIGHT_PROVINCE]: (state, action) => ({
    highlighted: null,
  }),

};


export default createReducer(initialState, handlers);
