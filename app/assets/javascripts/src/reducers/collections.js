

import { createReducer } from '../utils';

import {
  REQUEST_COLLECTIONS,
  RECEIVE_COLLECTIONS,
} from '../constants';


const initialState = {
  loading: false,
  features: [],
  selected: null,
};


const handlers = {

  [REQUEST_COLLECTIONS]: () => ({
    loading: true,
  }),

  [RECEIVE_COLLECTIONS]: (state, action) => ({
    features: action.geojson.features,
    loading: false,
  }),

};


export default createReducer(initialState, handlers);
