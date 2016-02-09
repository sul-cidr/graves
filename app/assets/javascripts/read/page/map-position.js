

import $ from 'jquery';


let height, fixed = false;


/**
 * Cache the window height.
 */
function cacheHeight() {
  height = $(window).height();
}


/**
 * When the header scroll out of view, fix the map.
 */
function positionMap() {
  let top = $(window).scrollTop();
  $('#map').toggleClass('fixed', top > height);
}


$(window).resize(cacheHeight);
cacheHeight();

$(window).scroll(positionMap);
positionMap();
