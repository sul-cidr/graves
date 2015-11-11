

import $ from 'jquery';
import * as utils from './utils';

import dataFocusNarrativeJSON from
'./fixtures/anchor-spans/data-focus.narrative.json';

import dataZoomNarrativeJSON from
'./fixtures/anchor-spans/data-zoom.narrative.json';


describe('Anchor Spans', function() {

  beforeEach(function() {
    utils.navigate('/read/narrative');
  });

  describe('data-focus', function() {

    beforeEach(function() {
      utils.respondNarrative(dataFocusNarrativeJSON);
    });

    it('shows a highlight line on hover', function() {

      // Hover on the span.
      $('.anchor:first-child').trigger('mouseenter');
      let line = $('#map-line line');

      expect(line).toBeInDOM();

      // TODO: Test position?

    });

    it('focuses the map on click', function(done) {

      // Click on the span.
      $('.anchor:first-child').trigger('click');

      setTimeout(function() {

        let {
          lng: lon,
          lat: lat,
        } = utils.getLeaflet().getCenter();

        expect(Math.round(lon)).toEqual(1);
        expect(Math.round(lat)).toEqual(2);
        done();

      }, 2000);

    });

  });

  describe('data-zoom', function() {

    beforeEach(function() {
      utils.respondNarrative(dataZoomNarrativeJSON);
    });

    it('applies a custom zoom level on click', function(done) {

      // Click on the span.
      $('.anchor:first-child').trigger('click');

      setTimeout(function() {
        let zoom = utils.getLeaflet().getZoom();
        expect(zoom).toEqual(1);
        done();
      }, 2000);

    });

  })

});
