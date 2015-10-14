

import Radio from 'backbone.radio';

import {
  SHOW_HIGHLIGHT_LINE,
  HIDE_HIGHLIGHT_LINE,
} from '../constants';


const channel = Radio.channel('narrative');


/**
 * Show the text -> map highlight line.
 *
 * @param {Object} span
 * @param {Number} lon
 * @param {Number} lat
 */
export function showHighlightLine(span, lon, lat) {
  channel.request(SHOW_HIGHLIGHT_LINE, span, lon, lat);
}


/**
 * Hide the highlight line.
 */
export function hideHighlightLine() {
  channel.request(HIDE_HIGHLIGHT_LINE);
}
