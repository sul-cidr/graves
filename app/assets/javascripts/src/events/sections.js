

import Radio from 'backbone.radio';

import {
  SECTIONS,
  SCROLL_SECTION,
  SELECT_SECTION,
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


/**
 * Select a collection.
 *
 * @param {Number} id
 * @param {String} id
 */
export function selectSection(id, origin) {
  channel.trigger(SELECT_SECTION, id);
}
