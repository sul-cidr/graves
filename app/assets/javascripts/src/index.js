

import 'babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import page from 'page';
import createStore from './store';
import App from './components/app';
import createRouter from './router';
import reducers from './reducers';


/**
 * Render the application.
 */
export function mount() {

  let store = createStore(reducers);

  // Mount the app.
  let app = ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root')
  );

  // Listen for routes.
  app.router = createRouter(store);
  app.router.init();

  return app;

}


if (!window.JASMINE) {
  mount();
}
