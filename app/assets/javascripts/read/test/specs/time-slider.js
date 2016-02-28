

import * as utils from '../utils';
import * as assert from '../assert';


import filterCollectionsJSON from
'../fixtures/time-slider/collections/filter.json';


describe('Time Slider', function() {


  beforeEach(function() {
    utils.start();
  });


  it('opens the time slider when the toggle is flipped', function() {

    utils.toggleTimeSlider();

    expect('#time-slider').toBeVisible();

  });


  it('filters collections when the brush is changed', function() {

    utils.respondCollections(filterCollectionsJSON);
    utils.toggleTimeSlider();

    // Brush excludes collection 2.
    utils.setTimeSliderBrush('2008-01-01', '2011-01-01');

    assert.visibleCollections(1);

  });


  it('unfilters collections when the slider is closed', function() {

    utils.respondCollections(filterCollectionsJSON);
    utils.toggleTimeSlider();

    // Brush excludes collection 2.
    utils.setTimeSliderBrush('2008-01-01', '2011-01-01');

    // Close the slider.
    utils.toggleTimeSlider();

    // Should re-show collection 2.
    assert.visibleCollections(1, 2);

  });


});
