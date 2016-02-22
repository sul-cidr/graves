

import Radio from 'backbone.radio';

import {
  MAP,
  SHOW_MAP_LINE,
  HIDE_MAP_LINE,
} from '../constants';


const channel = Radio.channel(MAP);


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
