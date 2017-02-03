

import $ from 'jquery';
import TestUtils from 'react-addons-test-utils';

import * as utils from '../utils';
import * as assert from '../assert';

import mountDefaultHTML from
'../fixtures/base-layers/page/mount-default.html';

describe('Custom Leaflet Buttons', function() {


  it('creates a reset button on the leaflet canvas', function() {

    utils.start(mountDefaultHTML);

    expect('.leaflet-control-reset').toExist();

  });


  it('zooms out to original level on click', function(done) {

    utils.start(mountDefaultHTML);

    // zoom in so we can test whether things zoom out.
    utils.getLeaflet().setView([20,20], 7);
    $('.leaflet-control-reset').trigger('click');

    // We have to wait for leaflet to perform its transition
    // before running our assertions.
    setTimeout(done, 1500);

    assert.mapZoom(5);
    assert.mapCenter(112, 32);
  });


});
