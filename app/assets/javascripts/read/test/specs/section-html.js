

import * as utils from '../utils';
import * as assert from '../assert';


describe('Collection HTML', function() {


  describe('data-tl+data-br', function() {


    describe('hover', function() {

      describe('when the section is not focused', function() {
        it('shows the tooltip');
      });

      describe('when the section is focused', function() {
        it('does not show the tooltip');
      });

    });


    describe('blur', function() {

      describe('when the section is not focused', function() {
        it('hides the tooltip');
      });

    });


    describe('click', function() {

      describe('when the section is not focused', function() {
        it('focuses the map');
      });

      describe('when the section is focused', function() {
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
