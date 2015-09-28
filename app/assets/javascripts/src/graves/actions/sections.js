

import fetch from 'isomorphic-fetch';

import {
  MOUNT_SECTIONS,
} from '../constants';


/**
 * When sections are extracted.
 */
export function mountSections(attrs) {
  return {
    type: MOUNT_SECTIONS,
    attrs: attrs,
  };
}
