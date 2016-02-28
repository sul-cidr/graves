

import Radio from 'backbone.radio';

import {
  TAGS,
  SET_TAGS,
  UNSET_TAGS,
} from '../constants';


const channel = Radio.channel(TAGS);


/**
 * Apply a tag filter.
 *
 * @param {Array} tags
 */
export function setTags(tags) {
  channel.trigger(SET_TAGS, tags);
}


/**
 * Clear the tag filter.
 */
export function unsetTags() {
  channel.trigger(UNSET_TAGS);
}
