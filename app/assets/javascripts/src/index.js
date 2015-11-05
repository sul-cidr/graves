

import 'babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './store';
import App from './components/app';
import router from './router';
import reducers from './reducers';


export var store;


export function mount() {

  store = createStore(reducers);

  // Mount the app.
  let app = ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root')
  );

  // Listen for routes.
  router.init();

  return app;

}


if (!window.JASMINE) {
  mount();
}
