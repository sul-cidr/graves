

import { createReducer } from '../utils';


import {
  TOGGLE_MAP_MENU,
  TOGGLE_TIMELINE,
} from '../constants';


const initialState = {
  mapMenu: false,
  timeline: false,
};


const handlers = {

  [TOGGLE_MAP_MENU]: (state, action) => ({
    mapMenu: action.show,
  }),

  [TOGGLE_TIMELINE]: (state, action) => ({
    timeline: action.show,
  }),

};


export default createReducer(initialState, handlers);
