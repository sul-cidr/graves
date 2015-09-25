

import createReducer from '../utils/create-reducer';

import {
  REQUEST_NARRATIVE,
  RECEIVE_NARRATIVE,
} from '../constants';


const initialState = {
  loading: false,
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

};


export default createReducer(initialState, handlers);
