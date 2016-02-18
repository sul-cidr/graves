

import 'jasmine-jquery';
import 'jasmine-ajax';

import _ from 'lodash';
import $ from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import BaseLayer from '../src/components/base-layer';
import WmsLayer from '../src/components/wms-layer';

import init from '../src';


import defaultHTML from
'./fixtures/default/page/page.html';


/**
 * Mount the app.
 *
 * @param {String} fixture
 */
export function start(fixture) {

  stop();

  // Set the page fixture.
  jasmine.getFixtures().set(fixture || defaultHTML);
  jasmine.Ajax.install();

  window.ROOT = init();

}


/**
 * Stop the app.
 */
export function stop() {

  try {
    let read = document.getElementById('read');
    ReactDOM.unmountComponentAtNode(read);
  }

  catch (e) {}

  jasmine.Ajax.uninstall();

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
 * Open the base layer dropdown select.
 */
export function openBaseLayerSelect() {
  let control = $('.base-layer-select .Select-control');
  TestUtils.Simulate.mouseDown(control.get(0));
}


/**
 * Open the WMS layer dropdown select.
 */
export function openWmsLayerSelect() {
  let control = $('.wms-layer-select .Select-control');
  TestUtils.Simulate.mouseDown(control.get(0));
}


/**
 * Assert the tile URL of the current base layer.
 *
 * @param {String} url
 */
export function assertBaseLayerTileUrl(url) {

  // Get the <BaseLayer /> instance.
  let baseLayer = getComponent(BaseLayer);

  expect(baseLayer.props.map.hasLayer(baseLayer.layer)).toBeTruthy();
  expect(baseLayer.layer._url).toEqual(url);

}


/**
 * Assert the address/layer of the current WMS layer.
 *
 * @param {String} address
 * @param {String} layer
 */
export function assertWmsLayer(address, layer) {

  // Get the <WmsLayer /> instance.
  let wmsLayer = getComponent(WmsLayer);

  expect(wmsLayer.props.map.hasLayer(wmsLayer.layer)).toBeTruthy();
  expect(wmsLayer.layer._url).toEqual(address);
  expect(wmsLayer.layer.wmsParams.layers).toEqual(layer);

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
