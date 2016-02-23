

import $ from 'jquery';

import * as utils from '../utils';
import * as assert from '../assert';


import dataTlBrHTML from
'../fixtures/section-html/page/data-tl-br.html';


describe('Collection HTML', function() {


  describe('data-tl+data-br', function() {


    let div;


    beforeEach(function() {
      utils.start(dataTlBrHTML);
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
          div.trigger('mouseenter');
          div.trigger('click');
          setTimeout(done, 2000);
        });

        it('focuses the map', function() {
          assert.mapCenter(0, 0);
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

        it('shows the tooltip', function() {
          expect('.tooltip.section').not.toBeVisible();
        });

      });

      describe('click', function() {

        beforeEach(function() {
          div.trigger('mouseenter');
          div.trigger('click');
        });

        it('does not focus the map');

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
