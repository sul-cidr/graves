

import createReducer from '../utils/create-reducer';

import {
  REQUEST_COUNTIES,
  RECEIVE_COUNTIES,
  RENDER_COUNTIES,
  HIGHLIGHT_COUNTY,
  UNHIGHLIGHT_COUNTY,
  RENDER_CHOROPLETH,
} from '../constants';


const initialState = {
  loading: false,
  geojson: {},
  highlighted: null,
  layers: {},
};


const handlers = {

  [REQUEST_COUNTIES]: (state, action) => ({
    loading: true,
  }),

  [RECEIVE_COUNTIES]: (state, action) => ({
    geojson: action.geojson,
    loading: false,
  }),

  [RENDER_COUNTIES]: (state, action) => ({
    layers: action.layers,
  }),

  [HIGHLIGHT_COUNTY]: (state, action) => ({
    highlighted: action.id,
  }),

  [UNHIGHLIGHT_COUNTY]: (state, action) => ({
    highlighted: null,
  }),

  [RENDER_CHOROPLETH]: (state, action) => ({
    choropleth: action.key,
  }),

};


export default createReducer(initialState, handlers);
