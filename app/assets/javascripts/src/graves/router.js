

import { Router } from 'director';
import store from './store';
import { showNarrative } from './actions/narrative';


export default Router({


  '/read/:slug': slug => {
    store.dispatch(showNarrative(slug));
  }


});
