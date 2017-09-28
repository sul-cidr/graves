import $ from 'jquery';
import TestUtils from 'react-addons-test-utils';

import * as utils from '../utils';
import * as assert from '../assert';

import mountDefaultHTML from
'../fixtures/base-layers/page/mount-default.html';

describe('Mini Map', function() {


  it('creates a mini-map SVG on the leaflet canvas', function() {

    utils.start(mountDefaultHTML);
    expect('#mini-map').toExist();

  });


  it('hides the mini-map when the time slider toggle is flipped', function() {

    utils.toggleTimeSlider();
    expect('#mini-map').not.toBeVisible();

  });

  it('mini-map rectangle is set on map zoom and panning', function(done) {
    utils.start(mountDefaultHTML);
    utils.getLeaflet().setView([20, 20], 7);
    let rect = d3.select('#mini-map rect'),
        previousX = rect.attr('x'),
        previousY = rect.attr('y');
    utils.getLeaflet().setView([30, 40], 6);
    // We have to wait for leaflet to perform its transition
    // before running our assertions.
    setTimeout(done, 1500);
    expect(previousX).not.toBe(rect.attr('x'));
    expect(previousY).not.toBe(rect.attr('y'));
  });

});
