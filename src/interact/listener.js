/* eslint-disable import/no-cycle */
import { highlightCells, fadeOutMeshes } from './handler';
import { lowlight } from './highlight';
import { grid, discs, colLabels, rowLabels } from '../app/init';

function addListener() {
  document
    .querySelector('#highlight-select')
    .addEventListener('change', function() {
      // Use `.call` to pass through `this`.
      highlightCells.call(this, layout, grid);
    });

  document
    .querySelector('#reset-grid-colour')
    .addEventListener('click', function() {
      lowlight(
        grid.children.filter(d => d.type === 'Mesh').map(d => d.material)
      );
    });

  document
    .querySelector('#remove-auto-corr')
    .addEventListener('click', function() {
      fadeOutMeshes(discs, d => d.userData.value === 1);
    });

  document
    .querySelector('#remove-lower-discs')
    .addEventListener('click', function() {
      fadeOutMeshes(
        discs,
        d => d.userData.index[1] <= d.userData.index[0],
        0.01
      );
    });

  document
    .querySelector('#remove-lower-grid')
    .addEventListener('click', function() {
      // Remove grid parts.
      fadeOutMeshes(
        grid,
        d => d.userData.index[1] <= d.userData.index[0],
        0.01,
        false
      );

      // Remove label.
      fadeOutMeshes(colLabels, d => d.userData.col === 'quality', 0.1);
    });

  document
    .querySelector('#remove-all-but-quality')
    .addEventListener('click', function() {
      // Fade out the discs.
      fadeOutMeshes(discs, d => d.userData.row !== 'quality', 0.01);

      // Fade out the grid.
      fadeOutMeshes(grid, d => d.userData.row !== 'quality', 0.01, false);

      // Fade out the labels.
      fadeOutMeshes(rowLabels, d => d.userData.row !== 'quality', 0.1);
    });
}

export default addListener;
