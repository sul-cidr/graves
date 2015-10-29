

import d3 from 'd3-browserify';


export default d3.scale.log()
  .domain([1, 400000])
  .range([1, 30]);
