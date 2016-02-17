

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
 * Given a tree and a component class, find the first occurrence of the class
 * and return the raw component instance.
 *
 * @param {ReactComponent} tree
 * @param {Function} type
 */
export function unwrap(tree, type) {
  let component = TestUtils.findRenderedComponentWithType(tree, type);
  return component.refs.wrappedInstance;
}
