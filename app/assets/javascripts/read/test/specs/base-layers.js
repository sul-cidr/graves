

import $ from 'jquery';
import TestUtils from 'react-addons-test-utils';

import * as utils from '../utils';


import mountDefaultHTML from
'../fixtures/base-layers/mount-default.html';

import listLayersHTML from
'../fixtures/base-layers/list-layers.html';

import changeLayerHTML from
'../fixtures/base-layers/change-layer.html';



describe('Base Layers', function() {


  it('mounts the default base layer on startup', function() {

    utils.start(mountDefaultHTML);

    utils.assertBaseLayerTileUrl('url3');

  });


  it('lists layers in the dropdown select', function() {

    utils.start(listLayersHTML);

    utils.openBaseLayerSelect();

    expect($('.Select-option:nth-child(1)')).toHaveText('Layer 1');
    expect($('.Select-option:nth-child(2)')).toHaveText('Layer 2');
    expect($('.Select-option:nth-child(3)')).toHaveText('Layer 3');
    expect($('.Select-option')).toHaveLength(3);

  });


  it('switches the layer when the select is changed', function() {

    utils.start(changeLayerHTML);

    for (let i of [1, 2, 3]) {

      utils.openBaseLayerSelect();

      let option = $(`.Select-option:nth-child(${i})`);
      TestUtils.Simulate.mouseDown(option.get(0));

      utils.assertBaseLayerTileUrl(`url${i}`);

    }

  });


});
