

import Radio from 'backbone.radio';

import {
  SELECT_ANCHOR,
} from '../constants';


const channel = Radio.channel('anchors');


/**
 * Select an anchor.
 *
 * @param {Array<Number>} lonlat
 */
export function selectAnchor(lonlat) {
  channel.trigger(SELECT_ANCHOR, lonlat);
}
