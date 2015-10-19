

import { createReducer } from '../utils';

import {
  REQUEST_NARRATIVE,
  RECEIVE_NARRATIVE,
  SCROLL_SECTION,
} from '../constants';


const initialState = {
  loading: false,
  spatial: false,
  model: {},
};


const handlers = {

  [REQUEST_NARRATIVE]: () => ({
    loading: true,
  }),

  [RECEIVE_NARRATIVE]: (state, action) => ({
    model: action.model,
    loading: false,
  }),

  [SCROLL_SECTION]: (state, action) => ({
    spatial: action.spatial,
  }),

};


export default createReducer(initialState, handlers);
