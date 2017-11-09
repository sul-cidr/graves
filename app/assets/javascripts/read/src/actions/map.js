

import {
  CHANGE_BASE_LAYER,
  CHANGE_WMS_LAYER,
  CHANGE_CHOROPLETH,
  TOGGLE_MAP_MENU,
  RESET_MAP_SETTINGS,
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

export function resetMapSettings() {
  return {
    type: RESET_MAP_SETTINGS,
  };
}


/**
 * Close the tutorial modal
 */
export function closeTutorialModal() {
  return {
    type: 'CLOSE_TUTORIAL_MODAL',
  };
}
