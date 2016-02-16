

import { createReducer } from '../utils';

import {
  REQUEST_COLLECTIONS,
  RECEIVE_COLLECTIONS,
  SELECT_COLLECTION,
  UNSELECT_COLLECTION,
} from '../constants';


const initialState = {
  loading: false,
  geojson: null,
  selected: null,
};


const handlers = {

  [REQUEST_COLLECTIONS]: () => ({
    loading: true,
  }),

  [RECEIVE_COLLECTIONS]: (state, action) => ({
    geojson: action.geojson,
    loading: false,
  }),

  [SELECT_COLLECTION]: (state, action) => ({
    selected: action.feature,
  }),

  [UNSELECT_COLLECTION]: () => ({
    selected: null,
  }),

};


export default createReducer(initialState, handlers);
