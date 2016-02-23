

import Radio from 'backbone.radio';

import {
  SECTIONS,
  GET_SECTION_CENTER,
  IS_SECTION_FOCUSED,
} from '../constants';


const channel = Radio.channel(SECTIONS);


/**
 * Is a map section in focus?
 *
 * @param {Number} id
 * @return {Boolean}
 */
export function isSectionFocused(id) {
  return channel.request(IS_SECTION_FOCUSED, id);
}


/**
 * Get the center of a section box.
 *
 * @param {Number} id
 * @return {Array}
 */
export function getSectionCenter(id) {
  return channel.request(GET_SECTION_CENTER, id);
}
