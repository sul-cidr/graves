

import $ from 'jquery';

import * as utils from '../utils';


describe('Base Layer', function() {


  afterEach(function() {
    utils.stop();
  });


  it('mounts the default base layer', function() {

    utils.start('base-layers/mount-default.html');

    expect($('#page')).toExist();

  });


});
