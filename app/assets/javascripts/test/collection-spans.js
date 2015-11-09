

import 'jasmine-jquery';

import $ from 'jquery';
import * as utils from './utils';

import showLineCollectionsJSON from
'./fixtures/collection-spans/show-line.collections.json';

import showLineNarrativeJSON from
'./fixtures/collection-spans/show-line.narrative.json';


describe('Collection Spans', function() {

  beforeEach(function() {
    utils.navigate('/read/narrative');
    utils.respondCollections(showLineCollectionsJSON);
    utils.respondNarrative(showLineNarrativeJSON);
  });

  it('shows a highlight line on hover', function() {

    // Hover on the span.
    $('.collection[data-id="1"]').trigger('mouseenter');
    let line = $('#map-line line');

    expect(line).toBeInDOM();

  });

  it('focuses the map on click', function() {

    $('.collection[data-id="1"]').trigger('click');

    // TODO
    console.log(utils.getLeaflet());

  });

});
