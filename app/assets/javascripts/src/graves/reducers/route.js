

import createReducer from '../utils/create-reducer';

import {
  SHOW_SPLASH,
  SHOW_NARRATIVE,
  SHOW_EXPLORE,
} from '../constants';


const initialState = {
  explore: false,
  narrative: null,
};


const handlers = {

  [SHOW_SPLASH]: (state, action) => ({
    explore: false,
    narrative: null,
  }),

  [SHOW_NARRATIVE]: (state, action) => ({
    explore: false,
    narrative: action.slug,
  }),

  [SHOW_EXPLORE]: (state, action) => ({
    explore: true,
    narrative: null,
  }),

};


export default createReducer(initialState, handlers);
