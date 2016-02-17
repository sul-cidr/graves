

import 'jasmine-jquery';

import _ from 'lodash';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import init from '../src';


/**
 * Mount the app.
 *
 * @param {String} fixture
 */
export function start(fixture) {

  stop();

  loadFixtures(fixture || 'default/page.html');
  window.ROOT = init();

}


/**
 * Stop the app.
 */
export function stop() {

  try {
    let read = ocument.getElementById('read');
    ReactDOM.unmountComponentAtNode(read);
  }

  catch (e) {}

}


/**
 * Find a component by type.
 *
 * @param {Function} type
 */
export function getComponent(type) {
  let component = TestUtils.findRenderedComponentWithType(ROOT, type);
  return _.get(component, 'refs.wrappedInstance') || component;
}


/**
 * Find a DOM node by class.
 *
 * @param {Function} cls
 */
export function getNode(cls) {
  return TestUtils.findRenderedDOMComponentWithClass(ROOT, cls);
}
