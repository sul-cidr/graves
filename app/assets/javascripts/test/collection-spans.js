

import _ from 'lodash';
import $ from 'jquery';
import * as utils from './utils';

import dataIdCollectionsJSON from
'./fixtures/collection-spans/data-id.collections.json';

import dataIdNarrativeJSON from
'./fixtures/collection-spans/data-id.narrative.json';

import dataZoomCollectionsJSON from
'./fixtures/collection-spans/data-zoom.collections.json';

import dataZoomNarrativeJSON from
'./fixtures/collection-spans/data-zoom.narrative.json';


describe('Collection Spans', function() {

  beforeEach(function() {
    utils.navigate('/read/narrative');
  });

  describe('data-id', function() {

    beforeEach(function() {
      utils.respondCollections(dataIdCollectionsJSON);
      utils.respondNarrative(dataIdNarrativeJSON);
    });

    it('shows a highlight line on hover', function() {

      // Hover on the span.
      $('.collection[data-id="1"]').trigger('mouseenter');
      let line = $('#map-line line');

      expect(line).toBeInDOM();

      // TODO: Test position?

    });

    it('focuses the map on click', function(done) {

      // Click on the span.
      $('.collection[data-id="1"]').trigger('click');

      // TODO: Mock window.requestAnimationFrame?

      setTimeout(function() {

        let {
          lng: lon,
          lat: lat,
        } = utils.getLeaflet().getCenter();

        expect(lon).toEqual(1);
        expect(lat).toEqual(2);
        done();

      }, 2000);

    });

  });

  describe('data-zoom', function() {

    beforeEach(function() {
      utils.respondCollections(dataZoomCollectionsJSON);
      utils.respondNarrative(dataZoomNarrativeJSON);
    });

    it('applies a custom zoom level on click', function(done) {

      // Click on the span.
      $('.collection[data-id="1"]').trigger('click');

      setTimeout(function() {
        let zoom = utils.getLeaflet().getZoom();
        expect(zoom).toEqual(1);
        done();
      }, 2000);

    });

  });

});
