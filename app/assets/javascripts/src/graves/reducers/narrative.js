

import createReducer from '../utils/create-reducer';

import {
  SHOW_NARRATIVE,
} from '../constants';


const initialState = {
  slug: null,
};


const handlers = {

  [SHOW_NARRATIVE]: (state, action) => ({
    slug: action.slug,
  }),

};


export default createReducer(initialState, handlers);
