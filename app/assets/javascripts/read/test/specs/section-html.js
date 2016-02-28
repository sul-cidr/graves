

import $ from 'jquery';
import moment from 'moment';

import CollectionMarkers from '../../src/components/collection-markers';
import TimeSlider from '../../src/components/time-slider';

import * as utils from '../utils';
import * as assert from '../assert';


import dataTlBrLabelHTML from
'../fixtures/section-html/page/data-tl-br-label.html';

import dataZoomHTML from
'../fixtures/section-html/page/data-zoom.html';

import dataBaseLayerHTML from
'../fixtures/section-html/page/data-base-layer.html';

import dataWmsLayerHTML from
'../fixtures/section-html/page/data-wms-layer.html';

import dataChoroplethHTML from
'../fixtures/section-html/page/data-choropleth.html';

import dataStartEndHTML from
'../fixtures/section-html/page/data-start-end.html';

import dataStartEndCollectionsJSON from
'../fixtures/section-html/collections/data-start-end.json';


describe('Section HTML', function() {


  describe('data-tl + data-br + data-label', function() {


    let div;


    beforeEach(function() {
      utils.start(dataTlBrLabelHTML);
      div = $('.section:first-child');
    });


    describe('when the section is not focused', function() {

      // Focus far from the section.
      beforeEach(function() {
        utils.getLeaflet().setView([100, 100]);
      });

      describe('hover', function() {

        beforeEach(function() {
          div.trigger('mouseenter');
        });

        it('shows the tooltip', function() {
          expect('.tooltip.section').toBeVisible();
        });

        it('adds .selectable', function() {
          expect(div).toHaveClass('selectable');
        });

      });

      describe('blur', function() {

        beforeEach(function() {
          div.trigger('mouseenter');
          div.trigger('mouseleave');
        });

        it('hides the tooltip', function() {
          expect('.tooltip.section').not.toBeVisible();
        });

        it('removes .selectable', function() {
          expect(div).not.toHaveClass('selectable');
        });

      });

      describe('click', function() {

        beforeEach(function(done) {
          div.trigger('click');
          setTimeout(done, 2000);
        });

        it('focuses the map', function() {
          assert.mapCenter(0, 0);
        });

        it('zooms to level 7, by default', function() {
          assert.mapZoom(7);
        });

        it('hides the tooltip', function() {
          expect('.tooltip.section').not.toBeVisible();
        });

        it('removes .selectable', function() {
          expect(div).not.toHaveClass('selectable');
        });

      });

    });


    describe('when the section is focused', function() {

      // Focus on the center of the section.
      beforeEach(function() {
        utils.getLeaflet().setView([0, 0]);
      });

      describe('hover', function() {

        beforeEach(function() {
          div.trigger('mouseenter');
        });

        it('does not the tooltip', function() {
          expect('.tooltip.section').not.toBeVisible();
        });

      });

      describe('click', function() {

        beforeEach(function() {
          div.trigger('click');
        });

        it('does not focus the map');

      });

    });


  });


  describe('data-zoom', function() {


    let div;


    beforeEach(function() {
      utils.start(dataZoomHTML);
      div = $('.section[data-zoom="1"]');
    });


    describe('click', function() {

      beforeEach(function(done) {
        div.trigger('click');
        setTimeout(done, 2000);
      });

      it('zooms the map', function() {
        assert.mapZoom(1);
      });

    });


  });


  describe('data-base-layer', function() {


    let div;


    beforeEach(function() {
      utils.start(dataBaseLayerHTML);
      div = $('.section[data-base-layer="2"]');
    });


    describe('click', function() {

      beforeEach(function() {
        div.trigger('click');
      });

      it('changes the base layer', function() {
        assert.baseLayerUrl('url2');
      });

    });


  });


  describe('data-wms-layer', function() {


    let div;


    beforeEach(function() {
      utils.start(dataWmsLayerHTML);
      div = $('.section[data-wms-layer="1"]');
    });


    describe('click', function() {

      beforeEach(function() {
        div.trigger('click');
      });

      it('sets the wms layer', function() {
        assert.wmsLayerParams('address1', 'layer1');
      });

    });


  });


  describe('data-choropleth', function() {


    let div;


    beforeEach(function() {
      utils.start(dataChoroplethHTML);
      div = $('.section[data-choropleth="a100002_10"]');
    });


    describe('click', function() {

      beforeEach(function() {
        div.trigger('click');
      });

      it('sets the wms layer', function() {
        assert.choroplethCode('a100002_10');
      });

    });


  });


  describe('data-start + data-end', function() {


    let span;


    beforeEach(function() {

      utils.start(dataStartEndHTML);
      utils.respondCollections(dataStartEndCollectionsJSON);

      span = $('.section:first-child');

    });


    describe('click', function() {

      beforeEach(function() {
        span.trigger('click');
      });

      it('sets the time slider brush', function() {
        assert.timeSliderExtent('2008-01-01', '2010-01-01');
      });

      it('sets filters collection markers', function() {

        let map = utils.getLeaflet();
        let markers = utils.getComponent(CollectionMarkers);

        let c1 = markers.idToMarker[1];
        let c2 = markers.idToMarker[2];

        expect(map.hasLayer(c1)).toBeTruthy();
        expect(map.hasLayer(c2)).toBeFalsy();

      });

    });


  });


  describe('data-tags', function() {
    it('filters collections by tag');
  });


});
