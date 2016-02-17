

import 'jasmine-jquery';
import ReactDOM from 'react-dom';

import init from '../../src';


/**
 * Mount the app.
 */
export function start() {
  window.ROOT = init();
}


/**
 * Stop the app.
 */
export function stop() {
  ReactDOM.unmountComponentAtNode(document.getElementById('read'));
}
