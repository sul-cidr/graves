

import { createReducer } from '../utils';


import {
  CLOSE_TUTORIAL_MODAL,
} from '../constants';


const initialState = {

  showTutorialModal: tutorialState(),

};

function tutorialState() {
  if (sessionStorage.getItem('tutorialModal') == 'false') {
    return false;
  } else {
    return true;
  }
};


const handlers = {

  [CLOSE_TUTORIAL_MODAL]: () => ({
    showTutorialModal: false,
  }),

};


export default createReducer(initialState, handlers);
