

import $ from 'jquery';

import BaseLayer from '../src/components/base-layer';

import * as utils from '../utils';


describe('Base Layer', function() {


  afterEach(function() {
    utils.stop();
  });


  it('mounts the default base layer on startup', function() {

    utils.start('base-layers/mount-default.html');

    let baseLayer = utils.unwrapType(BaseLayer);

    expect(baseLayer.props.map.hasLayer(baseLayer.layer)).toBeTruthy();
    expect(baseLayer.layer._url).toEqual('url3');

  });


});
