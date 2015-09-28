

import { createReducer } from '../utils';

import {
  REQUEST_COLLECTIONS,
  RECEIVE_COLLECTIONS,
} from '../constants';


const initialState = {
  loading: false,
  features: [],
};


const handlers = {

  [REQUEST_COLLECTIONS]: (state, action) => ({
    loading: true,
  }),

  [RECEIVE_COLLECTIONS]: (state, action) => ({
    features: action.geojson.features,
    loading: false,
  }),

};


export default createReducer(initialState, handlers);
