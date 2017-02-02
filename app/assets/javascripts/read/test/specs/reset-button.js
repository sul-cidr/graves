

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


  it('zooms out to original level on click', function() {

    utils.start(mountDefaultHTML);
    $('.leaflet-control-reset').click();

    // Access the leaflet map to check zoom level somehow?
    // expect('.leaflet-control-reset').toExist();
  });


});
