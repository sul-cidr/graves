

import { createReducer } from '../utils';


import {
  CHANGE_BASE_LAYER,
  CHANGE_WMS_LAYER,
  CHANGE_CHOROPLETH,
  TOGGLE_MAP_MENU,
} from '../constants';


const initialState = {

  baseLayerId: null,
  wmsLayerId: null,

  // TODO: Trigger this from <CountyChoropleth />.
  choropleth: 'a100001_10',

  showMenu: false,

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
