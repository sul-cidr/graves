

import $ from 'jquery';
import TestUtils from 'react-addons-test-utils';

import * as utils from '../utils';


describe('Base Layer', function() {


  it('mounts the default base layer on startup', function() {

    utils.start('base-layers/mount-default.html');

    utils.assertBaseLayerTileUrl('url3');

  });


  it('lists layers in the dropdown select', function() {

    utils.start('base-layers/list-layers.html');

    utils.openBaseLayerSelect();

    expect($('.Select-option:nth-child(1)')).toHaveText('Layer 1');
    expect($('.Select-option:nth-child(2)')).toHaveText('Layer 2');
    expect($('.Select-option:nth-child(3)')).toHaveText('Layer 3');
    expect($('.Select-option')).toHaveLength(3);

  });


  it('switches the layer when the select is changed', function() {

    utils.start('base-layers/change-layer.html');

    // At start, default layer.
    utils.assertBaseLayerTileUrl('url1');

    utils.openBaseLayerSelect();

    // Click on the second option.
    let option = $('.Select-option:nth-child(2)');
    TestUtils.Simulate.mouseDown(option.get(0));

    utils.assertBaseLayerTileUrl('url2');

  });


});
