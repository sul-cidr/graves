

import d3 from 'd3';


const scale = d3.scale.log()
  .domain([1, 400000])
  .range([1, 30]);


/**
 * Convert a grave count -> radius.
 *
 * @param {Number} numGraves
 * @param {Number} defCount
 */
export default function(numGraves, defCount=7) {
  return scale(numGraves || defCount);
}
