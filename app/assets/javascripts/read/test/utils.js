

import 'jasmine-jquery';

import _ from 'lodash';
import $ from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import BaseLayer from '../src/components/base-layer';
import WmsLayer from '../src/components/wms-layer';

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
