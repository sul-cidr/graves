

import 'babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './store';
import App from './components/app';
import reducers from './reducers';


/**
 * Render the application.
 */
export function mount() {

  let store = createStore(reducers);

  // Mount the app.
  window.GRAVES = ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root')
  );

}


if (!window.JASMINE) {
  mount();
}
