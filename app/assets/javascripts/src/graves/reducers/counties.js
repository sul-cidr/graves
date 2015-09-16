

import * as constants from '../constants';
import createReducer from '../utils/create-reducer';


const initialState = {
  loading: false,
  features: [],
  highlighted: null,
  layers: {},
};


const handlers = {

  [constants.REQUEST_COUNTIES]: (state, action) => ({
    loading: true,
  }),

  [constants.RECEIVE_COUNTIES]: (state, action) => ({
    features: action.features,
    loading: false,
  }),

  [constants.RENDER_COUNTIES]: (state, action) => ({
    layers: action.layers,
  }),

  [constants.HIGHLIGHT_COUNTY]: (state, action) => ({
    highlighted: action.id,
  }),

  [constants.UNHIGHLIGHT_COUNTY]: (state, action) => ({
    highlighted: null,
  }),

};


export default createReducer(initialState, handlers);
