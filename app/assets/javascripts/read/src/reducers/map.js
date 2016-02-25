

import { createReducer } from '../utils';


import {
  TOGGLE_MAP_MENU,
  CHANGE_BASE_LAYER,
  CHANGE_WMS_LAYER,
  CHANGE_CHOROPLETH,
} from '../constants';


const initialState = {

  showMenu: false,

  baseLayerId: null,
  wmsLayerId: null,
  choropleth: null,

};


const handlers = {

  [TOGGLE_MAP_MENU]: (state, action) => ({
    showMenu: action.show,
  }),

  [CHANGE_BASE_LAYER]: (state, action) => ({
    baseLayerId: action.layerId,
  }),

  [CHANGE_WMS_LAYER]: (state, action) => ({
    wmsLayerId: action.layerId,
  }),

  [CHANGE_CHOROPLETH]: (state, action) => ({
    choropleth: action.code,
  }),

};


export default createReducer(initialState, handlers);
