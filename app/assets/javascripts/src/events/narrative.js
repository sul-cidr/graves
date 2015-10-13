

import Radio from 'backbone.radio';

import {
  SHOW_HIGHLIGHT_LINE
} from '../constants';


const channel = Radio.channel('narrative');


/**
 * When a collection span is hovered.
 *
 * @param {Object} span
 * @param {Number} lon
 * @param {Number} lat
 */
export function showHighlightLine(span, lon, lat) {
  channel.trigger(SHOW_HIGHLIGHT_LINE, span, lon, lat);
}
