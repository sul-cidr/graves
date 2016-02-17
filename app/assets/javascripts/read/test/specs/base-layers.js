

import $ from 'jquery';

import * as utils from '../utils';
import * as assert from '../assert';


describe('Base Layer', function() {


  afterEach(function() {
    utils.stop();
  });


  it('mounts the default base layer on startup', function() {

    utils.start('base-layers/mount-default.html');

    assert.baseLayerUrl('url3');

  });


});
