

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

  let mockRaf;

  beforeEach(function() {
    utils.navigate('/read/narrative');
    mockRaf = utils.mockRaf();
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

    it('focuses the map on click', function() {

      // Click on the span.
      $('.collection[data-id="1"]').trigger('click');

      mockRaf.step(2000);

      let {
        lng: lon,
        lat: lat,
      } = utils.getLeaflet().getCenter();

      expect(Math.round(lon)).toEqual(1);
      expect(Math.round(lat)).toEqual(2);

    });

  });

  describe('data-zoom', function() {

    beforeEach(function() {
      utils.respondCollections(dataZoomCollectionsJSON);
      utils.respondNarrative(dataZoomNarrativeJSON);
    });

    it('applies a custom zoom level on click', function() {

      // Click on the span.
      $('.collection[data-id="1"]').trigger('click');

      mockRaf.step(2000);

      let zoom = utils.getLeaflet().getZoom();
      expect(zoom).toEqual(1);

    });

  });

});
