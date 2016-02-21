

import {
  MOUNT_SECTIONS,
} from '../constants';


/**
 * When sections are extracted.
 *
 * @param {Array} attrs
 */
export function mountSections(attrs) {
  return {
    type: MOUNT_SECTIONS,
    attrs,
  };
}
