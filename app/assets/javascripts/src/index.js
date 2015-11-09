

import 'babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import page from 'page';
import createStore from './store';
import App from './components/app';
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

  return app;

}


if (!window.JASMINE) {
  mount();
}
