

import { createReducer } from '../utils';

import {
  REQUEST_COUNTIES,
  RECEIVE_COUNTIES,
  SHOW_CHOROPLETH,
} from '../constants';


const initialState = {
  loading: false,
  geojson: null,
  choropleth: null,
};


const handlers = {

  [REQUEST_COUNTIES]: () => ({
    loading: true,
  }),

  [RECEIVE_COUNTIES]: (state, action) => ({
    geojson: action.geojson,
    loading: false,
  }),

  [SHOW_CHOROPLETH]: (state, action) => ({
    choropleth: action.code,
  }),

};


export default createReducer(initialState, handlers);
