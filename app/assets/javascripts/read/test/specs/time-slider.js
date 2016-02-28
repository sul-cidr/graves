

import * as utils from '../utils';


describe('Time Slider', function() {

  it('opens the time slider when the toggle is flipped', function() {

    utils.start();
    utils.toggleTimeSlider();

    expect('#time-slider').toBeVisible();

  });


  it('filters collections when the brush is changed');
  it('unfilters collections when the slider is closed');

});
