

import $ from 'jquery';
import TestUtils from 'react-addons-test-utils';

import BaseLayer from '../../src/components/base-layer';

import * as utils from '../utils';


/**
 * Query a child of the base layer select.
 *
 * @param {String} selector
 * @return {DOMElement}
 */
function queryBaseLayerChild(selector) {
  return utils.getNode('base-layer-select').querySelector(selector);
}


/**
 * Open the base layer dropdown select.
 */
function openBaseLayerSelect() {
  let control = queryBaseLayerChild('.Select-control');
  TestUtils.Simulate.mouseDown(control);
}


/**
 * Assert the tile URL of the current base layer.
 *
 * @param {String} url
 */
function assertBaseLayerTileUrl(url) {

  // Get the <BaseLayer /> instance.
  let baseLayer = utils.getComponent(BaseLayer);

  expect(baseLayer.props.map.hasLayer(baseLayer.layer)).toBeTruthy();
  expect(baseLayer.layer._url).toEqual(url);

}


describe('Base Layer', function() {


  it('mounts the default base layer on startup', function() {

    utils.start('base-layers/mount-default.html');

    assertBaseLayerTileUrl('url3');

  });


  it('lists layers in the dropdown select', function() {

    utils.start('base-layers/list-layers.html');

    openBaseLayerSelect();

    expect($('.Select-option:nth-child(1)')).toHaveText('Layer 1');
    expect($('.Select-option:nth-child(2)')).toHaveText('Layer 2');
    expect($('.Select-option:nth-child(3)')).toHaveText('Layer 3');
    expect($('.Select-option')).toHaveLength(3);

  });


  it('switches the layer when the select is changed', function() {

    utils.start('base-layers/change-layer.html');

    // At start, default layer.
    assertBaseLayerTileUrl('url1');

    openBaseLayerSelect();

    // Click on the second option.
    let option = queryBaseLayerChild('.Select-option:nth-child(2)');
    TestUtils.Simulate.mouseDown(option);

    assertBaseLayerTileUrl('url2');

  });


});
