/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
function getCorrLayout(data, { size = 1, type = 'full' } = {}) {
  const layout = [];

  // Layout loop.
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data.length; col++) {
      // Shape the grid.
      if (type === 'upper' && row <= col) continue;
      if (type === 'lower' && row >= col) continue;

      // Element info.
      const point = {
        value: data[row][data.columns[col]],
        row: data.columns[row],
        col: data.columns[col],
        index: [col, row],
        position: [col * size, row * size],
      };

      layout.push(point);
    }
  }
  return layout;
}

export default getCorrLayout;
