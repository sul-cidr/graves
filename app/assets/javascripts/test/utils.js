

import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import 'jasmine-ajax';

import { mount } from '../src';
import App from '../src/components/app';
import Map from '../src/components/map';


/**
 * Mock the environment and start the app.
 */
export function start() {
  jasmine.Ajax.install();
  window.GRAVES = mount();
}


/**
 * Start the app.
 */
export function stop() {
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  jasmine.Ajax.uninstall();
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


/**
 * Respond 200 to a request.
 *
 * @param {FakeXMLHttpRequest} req
 * @param {String} res
 */
export function respond200(req, res) {
  req.respondWith({
    status: 200,
    responseText: res,
  });
}


/**
 * Inject a collections fixture.
 *
 * @param {String} res
 */
export function respondCollections(res) {
  let req = jasmine.Ajax.requests.filter(/collections/)[0];
  respond200(req, res);
}


/**
 * Inject a narrative fixture.
 *
 * @param {String} res
 */
export function respondNarrative(res) {
  let req = jasmine.Ajax.requests.filter(/narratives/)[0];
  respond200(req, res);
}


/**
 * Navigate to a narrative.
 *
 * @param {String} route
 * @param {Function} cb
 */
export function navigate(route) {
  unwrap(GRAVES, App).router.dispatch('on', route);
}


/**
 * Pluck out the Leaflet map instance.
 *
 * @return {Leaflet.Map}
 */
export function getLeaflet() {
  return unwrap(GRAVES, Map).state.map;
}
