

import { createReducer } from '../utils';

import {
  TOGGLE_EDITOR,
} from '../constants';


const initialState = {
  active: false,
};


const handlers = {

  [TOGGLE_EDITOR]: (state, action) => ({
    active: !state.active,
  }),

};


export default createReducer(initialState, handlers);
