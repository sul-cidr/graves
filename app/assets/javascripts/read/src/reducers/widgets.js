

import { createReducer } from '../utils';


import {
  TOGGLE_MAP_MENU,
} from '../constants';


const initialState = {
  mapMenu: false,
};


const handlers = {

  [TOGGLE_MAP_MENU]: (state, action) => ({
    mapMenu: action.show,
  }),

};


export default createReducer(initialState, handlers);
