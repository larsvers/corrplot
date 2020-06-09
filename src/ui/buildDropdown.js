import { select } from 'd3-selection/src/index';

function buildDropdown(list) {
  select('#highlight-select')
    .selectAll('option')
    .data(list)
    .join('option')
    .attr('value', d => `${d.row} | ${d.col}`)
    .html(d => `${d.row} | ${d.col}`);
}

export default buildDropdown;
