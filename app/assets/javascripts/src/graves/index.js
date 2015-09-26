

import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/app';
import router from './router';


store.subscribe(() => {
  console.log(store.getState());
});


React.render(

  <Provider store={store}>{() =>
    <App />
  }</Provider>,

  document.getElementById('root')

);


router.init();
