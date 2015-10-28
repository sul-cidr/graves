

import Radio from 'backbone.radio';

import {
  MAP,
  FOCUS_MAP,
  IS_SECTION_FOCUSED,
  SHOW_MAP_LINE,
  HIDE_MAP_LINE,
} from '../constants';


const channel = Radio.channel(MAP);


/**
 * Focus the map on a point.
 *
 * @param {Number} lon
 * @param {Number} lat
 * @param {Number} zoom
 */
export function focusMap(lon, lat, zoom) {
  return channel.request(FOCUS_MAP, lon, lat, zoom);
}


/**
 * Is a map section in focus?
 *
 * @param {Number} id
 */
export function isSectionFocused(id) {
  return channel.request(IS_SECTION_FOCUSED, id);
}


/**
 * Show the text -> map highlight line.
 *
 * @param {Object} span
 * @param {Number} lon
 * @param {Number} lat
 */
export function showMapLine(span, lon, lat) {
  channel.request(SHOW_MAP_LINE, span, lon, lat);
}


/**
 * Hide the highlight line.
 */
export function hideMapLine() {
  channel.request(HIDE_MAP_LINE);
}
