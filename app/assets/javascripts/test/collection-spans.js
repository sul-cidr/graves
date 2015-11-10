

import 'jasmine-jquery';

import $ from 'jquery';
import createMockRaf from 'mock-raf';
import sinon from 'sinon';
import * as utils from './utils';

import showLineCollectionsJSON from
'./fixtures/collection-spans/show-line.collections.json';

import showLineNarrativeJSON from
'./fixtures/collection-spans/show-line.narrative.json';


describe('Collection Spans', function() {

  let mockRaf;

  beforeEach(function() {

    // Open narrative.
    utils.navigate('/read/narrative');

    // Inject fixtures.
    utils.respondCollections(showLineCollectionsJSON);
    utils.respondNarrative(showLineNarrativeJSON);

    // TODO|dev
    mockRaf = createMockRaf();
    sinon.stub(window, 'requestAnimationFrame', mockRaf.raf);

  });

  afterEach(function() {
    window.requestAnimationFrame.restore();
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

    mockRaf.step(1000);

    let {
      lng: lon,
      lat: lat,
    } = utils.getLeaflet().getCenter();

    expect(lon).toEqual(1);
    expect(lat).toEqual(2);

  });

});
