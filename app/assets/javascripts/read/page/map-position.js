

import $ from 'jquery';


let height;


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
  $('body').toggleClass('fixed', top > height);
}


$(window).resize(cacheHeight);
cacheHeight();

$(window).scroll(positionMap);
positionMap();
