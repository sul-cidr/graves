

import 'jasmine-jquery';
import TestUtils from 'react-addons-test-utils';
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


/**
 * Find a component by type.
 *
 * @param {Function} type
 */
export function unwrapType(type) {
  let component = TestUtils.findRenderedComponentWithType(ROOT, type);
  return component.refs.wrappedInstance;
}
