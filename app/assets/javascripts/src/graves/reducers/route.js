

import createReducer from '../utils/create-reducer';

import {
  SHOW_SPLASH,
  SHOW_NARRATIVE,
} from '../constants';


const initialState = {
  narrative: null,
};


const handlers = {

  [SHOW_SPLASH]: (state, action) => ({
    narrative: null,
  }),

  [SHOW_NARRATIVE]: (state, action) => ({
    narrative: action.slug,
  }),

};


export default createReducer(initialState, handlers);
