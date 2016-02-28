

import { createReducer } from '../utils';


import {
  SET_TAG_FILTER,
  SET_DATE_FILTER,
  CLEAR_FILTERS,
} from '../constants';


const initialState = {

  tags: null,

  startDate: null,
  endDate: null,

};


const handlers = {

  [SET_TAG_FILTER]: (state, action) => ({
    tags: action.tags,
  }),

  [SET_DATE_FILTER]: (state, action) => ({
    startDate: action.start,
    endDate: action.end,
  }),

  [CLEAR_FILTERS]: () => initialState,

};


export default createReducer(initialState, handlers);
