

import $ from 'jquery';
import * as utils from './utils';

import dataFocusNarrativeJSON from
'./fixtures/anchor-spans/data-focus.narrative.json';


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

    it('focuses the map on click');

  });

});
