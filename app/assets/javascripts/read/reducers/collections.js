

import { createReducer } from '../utils';

import {
  REQUEST_COLLECTIONS,
  RECEIVE_COLLECTIONS,
} from '../constants';


const initialState = {
  loading: false,
  geojson: null,
};


const handlers = {

  [REQUEST_COLLECTIONS]: () => ({
    loading: true,
  }),

  [RECEIVE_COLLECTIONS]: (state, action) => ({
    geojson: action.geojson,
    loading: false,
  }),

};


export default createReducer(initialState, handlers);
