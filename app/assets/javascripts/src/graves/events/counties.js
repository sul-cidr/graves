

import Radio from 'backbone.radio';

import {
  HIGHLIGHT_COUNTY,
  UNHIGHLIGHT_COUNTY,
} from '../constants';


const channel = Radio.channel('counties');


/**
 * Highlight a county.
 *
 * @param {Number} id
 */
export function highlightCounty(id) {
  channel.trigger(HIGHLIGHT_COUNTY, id);
}


/**
 * Unhighlight county.
 *
 * @param {Number} id
 */
export function unhighlightCounty(id) {
  channel.trigger(UNHIGHLIGHT_COUNTY, id);
}
