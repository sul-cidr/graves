

import $ from 'jquery';


let height, fixed = false;


/**
 * Cache the window height.
 */
function getHeight() {
  height = $(window).height();
}


/**
 * When the header scroll out of view, fix the map.
 */
function fixMap() {

  let top = $(window).scrollTop();

  if (top > height && !fixed) {
    $('#map').addClass('fixed');
    fixed = true;
  }

  else if (top < height && fixed) {
    $('#map').removeClass('fixed');
    fixed = false;
  }

}


$(window).resize(getHeight);
getHeight();

$(window).scroll(fixMap);
fixMap();
