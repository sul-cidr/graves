

import 'babel/polyfill';

import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import App from './components/app';
import createStore from './store';
import reducers from './reducers';

import './page';


/**
 * Run the application.
 */
export default function init() {

  let store = createStore(reducers);

  return ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('read'),
  );

}


if (!window.JASMINE) {
  init();
}
