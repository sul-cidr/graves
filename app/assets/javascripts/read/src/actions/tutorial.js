

import {
  CLOSE_TUTORIAL_MODAL
} from '../constants';

/**
 * Close the tutorial modal
 */
export function closeTutorialModal() {
  return {
    type: CLOSE_TUTORIAL_MODAL,
  };
}
