

import { createReducer } from '../utils';


import {
  TOGGLE_TIME_SLIDER,
} from '../constants';


const initialState = {
  show: false,
};


const handlers = {

  [TOGGLE_TIME_SLIDER]: (state, action) => ({
    show: action.show,
  }),

};


export default createReducer(initialState, handlers);
