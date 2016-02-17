

import 'jasmine-jquery';
import ReactDOM from 'react-dom';

import init from '../src';


/**
 * Mount the app.
 *
 * @param {String} fixture
 */
export function start(fixture) {
  loadFixtures(fixture || 'default/page.html');
  window.ROOT = init();
}


/**
 * Stop the app.
 */
export function stop() {
  ReactDOM.unmountComponentAtNode(document.getElementById('read'));
}
