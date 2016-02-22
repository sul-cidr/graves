

import $ from 'jquery';

import * as utils from '../utils';
import * as assert from '../assert';


import dataIdHTML from
'../fixtures/collection-html/page/data-id.html';

import dataIdCollectionsJSON from
'../fixtures/collection-html/collections/data-id.json';


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

      it('shows the highlight line');

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

      it('hides the highlight line');

    });


    describe('click', function() {

      beforeEach(function(done) {

        span.trigger('click');

        // TODO: Mock requestAnimationFame?
        setTimeout(done, 2000);

      });

      it('focuses the map', function() {

        let { lng, lat } = utils.getLeaflet().getCenter();

        expect(Math.round(lng)).toEqual(1);
        expect(Math.round(lat)).toEqual(2);

      });

    });


  });


  describe('data-zoom', function() {
    it('zooms the map');
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
