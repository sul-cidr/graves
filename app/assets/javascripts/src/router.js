

import { Router } from 'director';

import {
  showSplash,
  showNarrative,
  showExplore,
} from './actions/route';


/**
 * Listen for routes.
 *
 * @param {Object} store
 */
export default function createRouter(store) {

  return Router({

    '/': () => {
      store.dispatch(showSplash());
    },

    '/read/:slug': slug => {
      store.dispatch(showNarrative(slug));
    },

    '/explore': () => {
      store.dispatch(showExplore());
    },

  });

}
