

import $ from 'jquery';

import * as utils from '../utils';


import dataIdHTML from
'../fixtures/collection-html/page/data-id.html';

import dataIdCollectionsJSON from
'../fixtures/collection-html/collections/data-id.json';


describe('Collection HTML', function() {


  describe('data-id', function() {


    beforeEach(function() {
      utils.start(dataIdHTML);
      utils.respondCollections(dataIdCollectionsJSON);
    });


    describe('hover', function() {

      it('highlights the map marker', function() {

        // Hover on the span.
        $(`.collection[data-id="1"]`).trigger('mouseenter');

        utils.assertPopupLabel('data-id');
        utils.assertHighlightedCollectionId(1);

      });

      it('shows the highlight line');

    });


    describe('blur', function() {
      it('unhighlights the map marker');
      it('hides the highlight line');
    });


    describe('click', function() {
      it('focuses the map');
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


});
