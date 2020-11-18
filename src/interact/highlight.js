/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */

import { Color } from 'three/build/three.module';
import { max, range } from 'd3-array/src/index';
import gsap from 'gsap/src/index';
import isEqual from 'lodash.isequal';
import state from '../core/state';

/* Utils */

// Big bang lowlighting for all grid cells
// back to the original base colour.
function lowlight(materials) {
  materials.forEach(d => (d.color = new Color(state.colours.gridBase)));
}

function lowlightGrid(grid) {
  grid.children
    .filter(d => d.type === 'Mesh')
    .map(d => d.material)
    .forEach(d => (d.color = new Color(state.colours.gridBase)));
}

// Gets the target colour based on the assumption
// that we highlight either positive (blue) or
// negative (red) cells.
function getTargetColour(value) {
  const targetColour =
    value > 0
      ? new Color(state.colours.gridPositive)
      : new Color(state.colours.gridNegative);
  return targetColour;
}

/* Highlight functions */

/**
 * Highlights a single specific cell.
 * @param { Array } grid The grid meshes
 * @param { String } row The row name
 * @param { String } col The column name
 */
function highlightSquare(grid, row, col) {
  // Switch all colours back to original.
  lowlightGrid(grid);

  // Get the square.
  const square = grid.children.filter(
    d => d.type === 'Mesh' && d.userData.row === row && d.userData.col === col
  );

  // Get the materials colour property.
  const colour = square[0].material.color;

  // Get the target colour.
  const targetColour = getTargetColour(square[0].userData.value);

  // Transition.
  gsap.to(colour, {
    r: targetColour.r,
    g: targetColour.g,
    b: targetColour.b,
  });
}

/**
 * Highlights a path to a single specific cell
 * from rows and columns.
 * @param { Array } data The layout data
 * @param { Array } grid The grid meshes
 * @param { String } row The row name
 * @param { String } col The column name
 */
function highlightSquares(data, grid, row, col) {
  // Lowlight all grid cells.
  lowlightGrid(grid);

  // Get the target square's index.
  const squareIndex = data.filter(d => d.row === row && d.col === col)[0].index;

  // Get all indeces that point to the target square.
  const dim = max(data.map(d => d.index[1]));
  const rowIndeces = range(0, squareIndex[0]);
  const colIndeces = range(squareIndex[1], dim + 1);
  const indeces = [
    ...rowIndeces.map(d => [d, squareIndex[1]]),
    ...colIndeces.map(d => [squareIndex[0], d]),
  ];

  // Create an array of all target square meshes.
  // Also - as a side - get the square we want to highlight.
  const squares = [];
  let square;
  grid.children.forEach(object => {
    indeces.forEach(index => {
      if (object.type === 'Mesh' && isEqual(object.userData.index, index)) {
        squares.push(object);
        if (isEqual(object.userData.index, squareIndex)) square = object;
      }
    });
  });

  // Get an array of the target mesh's colour objects.
  // Also, get the target colour from the main square.
  const colours = squares.map(d => d.material.color);
  const targetColour = getTargetColour(square.userData.value);

  gsap.to(colours, {
    r: targetColour.r,
    g: targetColour.g,
    b: targetColour.b,
    stagger: 0.1,
  });
}

/* Main function */

// Tween to highlight.
function highlight(
  data,
  grid,
  { row = undefined, col = undefined, single = false } = {}
) {
  single
    ? highlightSquare(grid, row, col)
    : highlightSquares(data, grid, row, col);
}

export { lowlightGrid };
export default highlight;
