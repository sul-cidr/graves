

import $ from 'jquery';
import TestUtils from 'react-addons-test-utils';

import * as utils from '../utils';


import listLayersHTML from
'../fixtures/wms-layers/list-layers.html';

import changeLayerHTML from
'../fixtures/wms-layers/change-layer.html';


describe('WMS Layers', function() {


  it('lists layers in the dropdown select', function() {

    utils.start(listLayersHTML);

    utils.openWmsLayerSelect();

    expect($('.Select-option:nth-child(1)')).toHaveText('Layer 1');
    expect($('.Select-option:nth-child(2)')).toHaveText('Layer 2');
    expect($('.Select-option:nth-child(3)')).toHaveText('Layer 3');
    expect($('.Select-option')).toHaveLength(3);

  });


  it('switches the layer when the select is changed', function() {

    utils.start(changeLayerHTML);

    for (let i of [1, 2, 3]) {

      utils.openWmsLayerSelect();

      let option = $(`.Select-option:nth-child(${i})`);
      TestUtils.Simulate.mouseDown(option.get(0));
      utils.assertWmsLayer(`address${i}`, `layer${i}`);

    }

  });


});
