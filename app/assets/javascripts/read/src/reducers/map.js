

import { createReducer } from '../utils';


import {
  CHANGE_BASE_LAYER,
  CHANGE_WMS_LAYER,
  CHANGE_CHOROPLETH,
  TOGGLE_MAP_MENU,
  RESET_MAP_SETTINGS,
} from '../constants';


const initialState = {

  baseLayerSlug: null,
  wmsLayerSlug: null,
  choropleth: null,

  showMenu: false,

};


const handlers = {

  [TOGGLE_MAP_MENU]: (state, action) => ({
    showMenu: action.show,
  }),

  [CHANGE_BASE_LAYER]: (state, action) => ({
    baseLayerSlug: action.slug,
  }),

  [CHANGE_WMS_LAYER]: (state, action) => ({
    wmsLayerSlug: action.slug,
  }),

  [CHANGE_CHOROPLETH]: (state, action) => ({
    choropleth: action.code,
  }),

  [RESET_MAP_SETTINGS]: (state) => ({
    baseLayerSlug: null,
    wmsLayerSlug: null,
    choropleth: null,
    showMenu: false,
  }),

};


export default createReducer(initialState, handlers);
