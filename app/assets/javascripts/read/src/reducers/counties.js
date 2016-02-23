

import { createReducer } from '../utils';


import {
  REQUEST_COUNTIES,
  RECEIVE_COUNTIES,
} from '../constants';


const initialState = {
  loading: false,
  geojson: null,
};


const handlers = {

  [REQUEST_COUNTIES]: () => ({
    loading: true,
  }),

  [RECEIVE_COUNTIES]: (state, action) => ({
    geojson: action.geojson,
    loading: false,
  }),

};


export default createReducer(initialState, handlers);
