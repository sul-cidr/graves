

import { createReducer } from '../utils';


import {
  SET_TAG_FILTER,
} from '../constants';


const initialState = {

  tags: null,

};


const handlers = {

  [SET_TAG_FILTER]: (state, action) => ({
    tags: action.tags,
  }),

};


export default createReducer(initialState, handlers);
