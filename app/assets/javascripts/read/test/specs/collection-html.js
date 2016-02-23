

import $ from 'jquery';

import * as utils from '../utils';
import * as assert from '../assert';


import dataIdHTML from
'../fixtures/collection-html/page/data-id.html';

import dataIdCollectionsJSON from
'../fixtures/collection-html/collections/data-id.json';

import dataZoomHTML from
'../fixtures/collection-html/page/data-zoom.html';

import dataZoomCollectionsJSON from
'../fixtures/collection-html/collections/data-zoom.json';


describe('Collection HTML', function() {


  describe('data-id', function() {


    let span;


    beforeEach(function() {

      utils.start(dataIdHTML);
      utils.respondCollections(dataIdCollectionsJSON);

      // Get the collection span.
      span = $('.collection[data-id="1"]');

    });


    describe('hover', function() {

      beforeEach(function() {
        span.trigger('mouseenter');
      });

      it('highlights the text span', function() {
        expect(span).toHaveClass('highlight');
      });

      it('highlights the map marker', function() {
        assert.highlightedCollectionId(1);
        assert.popupLabel('data-id');
      });

      it('shows the highlight line', function() {
        expect('#map-line line').toBeInDOM();
        // TODO: Test position?
      });

    });


    describe('blur', function() {

      beforeEach(function() {
        span.trigger('mouseenter');
        span.trigger('mouseleave');
      });

      it('unhighlights the text span', function() {
        expect(span).not.toHaveClass('highlight');
      });

      it('unhighlights the map marker', function() {
        assert.noCollectionHighlighted();
      });

      it('hides the highlight line', function() {
        expect('#map-line line').not.toBeInDOM();
      });

    });


    describe('click', function() {

      beforeEach(function(done) {
        span.trigger('click');
        setTimeout(done, 2000);
      });

      it('focuses the map', function() {
        assert.mapCenter(1, 2);
      });

    });


  });


  describe('data-zoom', function() {


    let span;


    beforeEach(function() {

      utils.start(dataZoomHTML);
      utils.respondCollections(dataZoomCollectionsJSON);

      // Get the collection span.
      span = $('.collection[data-id="1"]');

    });


    describe('click', function() {

      beforeEach(function(done) {
        span.trigger('click');
        setTimeout(done, 2000);
      });

      it('zooms the map', function() {
        expect(utils.getLeaflet().getZoom()).toEqual(1);
      });

    });


  });

  describe('data-base-layer', function() {
    it('sets the base layer');
  });

  describe('data-wms-layer', function() {
    it('sets the WMS layer');
  });

  describe('data-choropleth', function() {
    it('sets the choropleth variable');
  });

  describe('data-start', function() {
    it('sets the start date');
  });

  describe('data-end', function() {
    it('sets the end date');
  });


});
