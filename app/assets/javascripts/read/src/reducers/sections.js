

import { createReducer } from '../utils';


import {
  MOUNT_SECTIONS,
} from '../constants';


const initialState = {
  attrs: [],
};


const handlers = {

  [MOUNT_SECTIONS]: (state, action) => ({
    attrs: action.attrs,
  }),

};


export default createReducer(initialState, handlers);
