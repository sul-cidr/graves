import { CLOSE_TUTORIAL_MODAL, OPEN_TUTORIAL_MODAL } from "../constants";

/**
 * Close the tutorial modal
 */
export function closeTutorialModal() {
  return {
    type: CLOSE_TUTORIAL_MODAL
  };
}

/**
* Open the tutorial modal
*/
export function openTutorialModal() {
  return {
    type: OPEN_TUTORIAL_MODAL
  };
}
