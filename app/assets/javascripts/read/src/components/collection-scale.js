

import d3 from 'd3';


export const scale = d3.scale.log()
  .domain([1, 400000])
  .range([1, 30]);


/**
 * Convert grave count -> radius.
 *
 * @param {Number} count
 * @param {Number} defCount
 * @return {Number}
 */
export function countToRadius(count, defCount=7) {
  return scale(count || defCount);
}
