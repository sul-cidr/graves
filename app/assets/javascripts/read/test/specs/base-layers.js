

import $ from 'jquery';
import TestUtils from 'react-addons-test-utils';

import BaseLayer from '../../src/components/base-layer';

import * as utils from '../utils';


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


/**
 * Open the base layer dropdown select.
 */
function openBaseLayerSelect() {

  let control = utils.getNode('base-layer-select')
    .querySelector('.Select-control');

  TestUtils.Simulate.mouseDown(control);

}


describe('Base Layer', function() {


  it('mounts the default base layer on startup', function() {

    utils.start('base-layers/mount-default.html');

    assertBaseLayerTileUrl('url3');

  });


  it('lists layers in the dropdown select', function() {

    utils.start('base-layers/change-layer.html');

    openBaseLayerSelect();

    expect($('.Select-option')).toHaveLength(3);
    expect($('.Select-option:nth-of-type(1)')).toHaveText('Layer 1');
    expect($('.Select-option:nth-of-type(2)')).toHaveText('Layer 2');
    expect($('.Select-option:nth-of-type(3)')).toHaveText('Layer 3');

  });


  it('switches the layer when the select is changed');


});
