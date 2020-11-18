/* eslint-disable import/no-cycle */
import {
  highlightCells,
  fadeMeshes,
  toggleGrid,
  tiltDown,
  tiltUp,
  focusAll,
  focusQuality,
} from './handler';
import { lowlightGrid } from './highlight';

function addFullGrid(grid, rowLabels, colLabels, discs) {
  document.querySelector('#full-grid').addEventListener('click', function () {
    focusAll();
    toggleGrid('show', grid, 'fullGrid');
    fadeMeshes('show', colLabels, d => d);
    fadeMeshes('show', rowLabels, d => d);
    fadeMeshes('show', discs, d => d, 0.01);
  });
}

function showQuality(grid, discs, colLabels, rowLabels) {
  document
    .querySelector('#show-quality')
    .addEventListener('click', function () {
      focusAll();
      toggleGrid('hide', grid, 'qualityRow');
      fadeMeshes(
        'hide',
        discs,
        d => d.userData.row !== 'quality' || d.userData.value === 1,
        0.01
      );
      fadeMeshes('hide', colLabels, d => d.userData.col === 'quality');
      fadeMeshes('hide', rowLabels, d => d.userData.row !== 'quality');
      focusQuality(colLabels);
    });
}

function removeLowerGrid(grid, discs, colLabels) {
  document
    .querySelector('#remove-lower-grid')
    .addEventListener('click', function () {
      toggleGrid('hide', grid, 'lowerGrid');
      fadeMeshes('hide', colLabels, d => d.userData.col === 'quality');
      fadeMeshes(
        'hide',
        discs,
        d => d.userData.index[1] <= d.userData.index[0],
        0.01
      );
    });
}

function addLowerGrid(grid, discs, colLabels) {
  document
    .querySelector('#add-lower-grid')
    .addEventListener('click', function () {
      toggleGrid('show', grid, 'fullGrid');
      fadeMeshes('show', colLabels, d => d.userData.col === 'quality');
      fadeMeshes(
        'show',
        discs,
        d => d.userData.index[1] <= d.userData.index[0],
        0.01
      );
    });
}

function removeAutoCorrelation(discs) {
  document
    .querySelector('#remove-auto-corr')
    .addEventListener('click', function () {
      fadeMeshes('hide', discs, d => d.userData.value === 1);
    });
}

function addAutoCorrelation(discs) {
  document
    .querySelector('#add-auto-corr')
    .addEventListener('click', function () {
      fadeMeshes('show', discs, d => d.userData.value === 1);
    });
}

function tiltGrid(labels) {
  document
    .querySelector('#tilt-grid')
    .addEventListener('click', () => tiltDown(labels));
}

function tiltGridBack(labels) {
  document
    .querySelector('#tilt-grid-back')
    .addEventListener('click', () => tiltUp(labels));
}

// Actions.
function highlightSelect(layout, grid) {
  document
    .querySelector('#highlight-select')
    .addEventListener('change', function () {
      // Use `.call` to pass through `this`.
      highlightCells.call(this, layout, grid);
    });
}

function resetGridColour(grid) {
  document
    .querySelector('#reset-grid-colour')
    .addEventListener('click', function () {
      lowlightGrid(grid);
    });
}

// Main attaching function.
function addListener(layout, grid, discs, colLabels, rowLabels) {
  addFullGrid(grid, rowLabels, colLabels, discs);
  highlightSelect(layout, grid);
  resetGridColour(grid);
  removeAutoCorrelation(discs);
  addAutoCorrelation(discs);
  removeLowerGrid(grid, discs, colLabels);
  tiltGrid(colLabels);
  tiltGridBack(colLabels);
  addLowerGrid(grid, discs, colLabels);
  showQuality(grid, discs, colLabels, rowLabels);
}

export default addListener;
