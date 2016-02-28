

import * as utils from '../utils';


import filterCollectionsJSON from
'../fixtures/time-slider/collections/filter.json';


describe('Time Slider', function() {


  it('opens the time slider when the toggle is flipped', function() {

    utils.start();

    utils.toggleTimeSlider();

    expect('#time-slider').toBeVisible();

  });


  it('filters collections when the brush is changed', function() {

    utils.start();

    utils.respondCollections(filterCollectionsJSON);

    utils.toggleTimeSlider();

    // set brush
    // check collections

  });


  it('unfilters collections when the slider is closed');


});
