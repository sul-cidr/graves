

import 'babel/polyfill';

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


// TODO|dev
router.init('read/no-room-for-the-dead');
