

import $ from 'jquery';
import TestUtils from 'react-addons-test-utils';

import * as utils from '../utils';
import * as assert from '../assert';

import mountDefaultHTML from
'../fixtures/base-layers/page/mount-default.html';

describe('Bookmark Button', function() {


  it('creates a bookmark button on the leaflet canvas', function() {

    utils.start(mountDefaultHTML);

    expect('.leaflet-bookmark').toExist();

  });


  it('bookmark with latitude, longitude, and zoom level is set on timer', function(done) {
    utils.start(mountDefaultHTML);
    let link = $('.leaflet-bookmark a'),
        previousHref = link.attr('href');
    utils.getLeaflet().setView([20,20], 7);
    // We have to wait for leaflet to perform its transition
    // before running our assertions.
    setTimeout(done, 1500);
    expect(previousHref).not.toBe(link.attr('href'));
  });

  it('bookmark with latitude, longitude, and zoom level is set on click', function(done) {
    utils.start(mountDefaultHTML);
    let link = $('.leaflet-bookmark a');
    utils.getLeaflet().setView([20,20], 7);
    setTimeout(done, 1500);
    let previousHref = link.attr('href');
    utils.getLeaflet().setView([30,40], 6);
    setTimeout(done, 1500);
    link.trigger('click');
    expect(previousHref).not.toBe(link.attr('href'));
    let hash = link.attr('href').split('#')[1].split('/');
    expect(parseInt(hash[0])).toBe(6);
    expect(parseInt(hash[1])).toBe(30);
    expect(parseInt(hash[2])).toBe(40);
  });

});
