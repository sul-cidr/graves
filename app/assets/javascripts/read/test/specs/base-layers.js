

import $ from 'jquery';

import * as utils from '../utils';


describe('Base Layer', function() {


  beforeEach(function() {
    loadFixtures('base-layers/page.html');
    utils.start();
  });


  afterEach(function() {
    utils.stop();
  });


  it('mounts the default base layer', function() {
    expect($('#page')).toExist();
  });


});
