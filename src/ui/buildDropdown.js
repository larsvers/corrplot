import { select } from 'd3-selection/src/index';

function calculateList(layout) {
  // All possible combinations.
  const cells = layout.map(d => ({ row: d.row, col: d.col }));
  // Just a selection...
  const cellSelection = cells.filter(d => {
    return (
      (d.row === 'citric acid' && d.col === 'volatile acidity') ||
      (d.row === 'pH' && d.col === 'citric acid') ||
      (d.row === 'alcohol' && d.col === 'density') ||
      (d.row === 'total sulfur dioxide' && d.col === 'free sulfur dioxide') ||
      (d.row === 'quality' && d.col === 'alcohol')
    );
  });

  return cellSelection;
}

function buildDropdown(layout) {
  const list = calculateList(layout);

  select('#highlight-select')
    .selectAll('option')
    .data(list)
    .join('option')
    .attr('value', d => `${d.row} | ${d.col}`)
    .html(d => `${d.row} | ${d.col}`);
}

export default buildDropdown;
