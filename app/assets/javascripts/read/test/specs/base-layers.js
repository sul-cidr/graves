

import $ from 'jquery';

import * as utils from '../utils';


describe('Base Layers', function() {


  beforeEach(function() {
    loadFixtures('base-layers/page.html');
    utils.start();
  });


  afterEach(function() {
    utils.stop();
  });


  it('test', function() {
    expect($('#page')).toExist();
  });


});
