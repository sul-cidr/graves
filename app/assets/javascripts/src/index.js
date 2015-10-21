

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/app';
import router from './router';


ReactDOM.render(

  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root')

);


router.init();
