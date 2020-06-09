import highlight from './highlight';

function highlightCells(layout, grid) {
  // Get the values from the `select` element's values.
  const value = this.value.split(' | ');

  // Highlight the cell/s.
  highlight(layout, grid, {
    row: value[0],
    col: value[1],
    single: false,
  });
}

export { highlightCells };
