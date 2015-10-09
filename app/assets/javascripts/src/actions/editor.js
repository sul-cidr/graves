

import {
  TOGGLE_EDITOR,
} from '../constants';


/**
 * Toggle edit mode.
 */
export function toggleEditor() {
  return {
    type: TOGGLE_EDITOR,
  };
}
