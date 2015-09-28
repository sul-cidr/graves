

import fetch from 'isomorphic-fetch';

import {
  MOUNT_SECTIONS,
  UNMOUNT_SECTIONS,
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


/**
 * When sections removed.
 */
export function unmountSections() {
  console.log('unmount');
  return {
    type: UNMOUNT_SECTIONS,
  };
}
