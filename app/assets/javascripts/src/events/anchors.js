

import Radio from 'backbone.radio';

import {
  SELECT_ANCHOR,
} from '../constants';


const channel = Radio.channel('anchors');


/**
 * Select an anchor.
 *
 * @param {Array<Number>} lonlat
 * @param {Number} zoom
 */
export function selectAnchor(lonlat, zoom) {
  channel.trigger(SELECT_ANCHOR, lonlat, zoom);
}
