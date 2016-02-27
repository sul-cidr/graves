

import $ from 'jquery';

import CollectionMarkers from '../../src/components/collection-markers';

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

import dataBaseLayerHTML from
'../fixtures/collection-html/page/data-base-layer.html';

import dataWmsLayerHTML from
'../fixtures/collection-html/page/data-wms-layer.html';

import dataChoroplethHTML from
'../fixtures/collection-html/page/data-choropleth.html';

import dataStartEndHTML from
'../fixtures/collection-html/page/data-start-end.html';

import dataStartEndCollectionsJSON from
'../fixtures/collection-html/collections/data-start-end.json';


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

      it('zooms to level 8, by default', function() {
        assert.mapZoom(8);
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
        assert.mapZoom(1);
      });

    });


  });


  describe('data-base-layer', function() {


    let span;


    beforeEach(function() {
      utils.start(dataBaseLayerHTML);
      span = $('.collection[data-base-layer="2"]');
    });


    describe('click', function() {

      beforeEach(function() {
        span.trigger('click');
      });

      it('changes the base layer', function() {
        assert.baseLayerUrl('url2');
      });

    });


  });


  describe('data-wms-layer', function() {


    let span;


    beforeEach(function() {
      utils.start(dataWmsLayerHTML);
      span = $('.collection[data-wms-layer="1"]');
    });


    describe('click', function() {

      beforeEach(function() {
        span.trigger('click');
      });

      it('sets the WMS layer', function() {
        assert.wmsLayerParams('address1', 'layer1');
      });

    });


  });


  describe('data-choropleth', function() {


    let span;


    beforeEach(function() {
      utils.start(dataChoroplethHTML);
      span = $('.collection[data-choropleth="a100002_10"]');
    });


    describe('click', function() {

      beforeEach(function() {
        span.trigger('click');
      });

      it('sets the choropleth', function() {
        assert.choroplethCode('a100002_10');
      });

    });


  });


  describe('data-start + data-end', function() {


    let span;


    beforeEach(function() {

      utils.start(dataStartEndHTML);
      utils.respondCollections(dataStartEndCollectionsJSON);

      let d1 = '2005-01-01';
      let d2 = '2006-01-01';

      span = $(`.collection[data-start="${d1}"][data-end="${d2}"]`);

    });


    describe('click', function() {

      beforeEach(function() {
        span.trigger('click');
      });

      it('sets the time slider brush');

      it('sets filters collection markers', function() {

        let map = utils.getLeaflet();
        let markers = utils.getComponent(CollectionMarkers);

        let c1 = markers.idToMarker[1];
        let c2 = markers.idToMarker[2];

        expect(map.hasLayer(c1)).toBeTruthy();
        expect(map.hasLayer(c2)).toBeFalsey();

      });

    });


  });


  describe('data-tags', function() {
    it('filters collections by tag');
  });


});
