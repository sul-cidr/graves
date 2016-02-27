

import $ from 'jquery';
import TestUtils from 'react-addons-test-utils';

import * as utils from '../utils';
import * as assert from '../assert';


import mountDefaultHTML from
'../fixtures/base-layers/page/mount-default.html';

import listLayersHTML from
'../fixtures/base-layers/page/list-layers.html';

import changeLayerHTML from
'../fixtures/base-layers/page/change-layer.html';



describe('Base Layers', function() {


  it('mounts the default base layer on startup', function() {

    utils.start(mountDefaultHTML);

    assert.baseLayerUrl('url3');

  });


  it('lists layers in the dropdown select', function() {

    utils.start(listLayersHTML);
    utils.toggleMapMenu();

    utils.openBaseLayerSelect();

    expect('.Select-option:nth-child(1)').toHaveText('Layer 1');
    expect('.Select-option:nth-child(2)').toHaveText('Layer 2');
    expect('.Select-option:nth-child(3)').toHaveText('Layer 3');
    expect('.Select-option').toHaveLength(3);

  });


  it('switches the layer when the select is changed', function() {

    utils.start(changeLayerHTML);
    utils.toggleMapMenu();

    for (let i of [1, 2, 3]) {

      utils.openBaseLayerSelect();

      // Click on a layer option.
      let option = $(`.Select-option:nth-child(${i})`);
      TestUtils.Simulate.mouseDown(option.get(0));

      assert.baseLayerUrl(`url${i}`);

    }

  });


});
