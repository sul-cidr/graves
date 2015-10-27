

import Radio from 'backbone.radio';

import {
  SECTIONS,
  SCROLL_SECTION,
} from '../constants';


const channel = Radio.channel(SECTIONS);


/**
 * Highlight a collection.
 *
 * @param {Number} id
 */
export function scrollSection(id) {
  channel.trigger(SCROLL_SECTION, id);
}
