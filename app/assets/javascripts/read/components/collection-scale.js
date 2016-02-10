

import d3 from 'd3';


export default d3.scale.log()
  .domain([1, 400000])
  .range([1, 30]);
