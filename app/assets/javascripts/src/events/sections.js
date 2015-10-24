

import Radio from 'backbone.radio';

import {
  HIGHLIGHT_SECTION,
  UNHIGHLIGHT_SECTION,
} from '../constants';


const channel = Radio.channel('sections');


/**
 * Highlight a section.
 *
 * @param {Number} id
 */
export function highlightSection(id) {
  channel.trigger(HIGHLIGHT_SECTION, id);
}


/**
 * Unhighlight a section.
 *
 * @param {Number} id
 */
export function unhighlightSection(id) {
  channel.trigger(UNHIGHLIGHT_SECTION, id);
}
