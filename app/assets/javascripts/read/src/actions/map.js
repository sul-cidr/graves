

import {
  CHANGE_BASE_LAYER,
  CHANGE_WMS_LAYER,
  CHANGE_CHOROPLETH,
  TOGGLE_MAP_MENU,
} from '../constants';


/**
 * Change the base layer.
 *
 * @param {Number} slug
 */
export function changeBaseLayer(slug) {
  return {
    type: CHANGE_BASE_LAYER,
    slug,
  };
}


/**
 * Change the WMS layer.
 *
 * @param {Number} slug
 */
export function changeWmsLayer(slug) {
  return {
    type: CHANGE_WMS_LAYER,
    slug,
  };
}


/**
 * Show a CDC choropleth.
 *
 * @param {String} code
 */
export function changeChoropleth(code) {
  return {
    type: CHANGE_CHOROPLETH,
    code,
  };
}


/**
 * Toggle the map menu.
 *
 * @param {Boolean} show
 */
export function toggleMapMenu(show) {
  return {
    type: TOGGLE_MAP_MENU,
    show,
  };
}
