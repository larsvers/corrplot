/* eslint-disable import/no-cycle */
import { select } from 'd3-selection/src';
import {
  highlightCells,
  fadeMeshes,
  toggleGrid,
  tilt,
  untilt,
  focusAll,
  focusQuality,
} from './handler';
import { lowlightGrid } from './highlight';

let autoCorrelation = true;
let lowerGrid = true;
let tilted = false;

// Helper.
function setGlow(self, flag) {
  select(self).select('.outer').classed('glow-on', flag);
  select(self).select('.outer').classed('glow-off', !flag);
}

// Listener/handler.
function fullGrid(grid, rowLabels, colLabels, discs) {
  document.querySelector('#full-grid').addEventListener('click', function () {
    focusAll();
    toggleGrid('show', grid, 'fullGrid');
    fadeMeshes('show', colLabels, d => d);
    fadeMeshes('show', rowLabels, d => d);
    fadeMeshes('show', discs, d => d, 0.01);

    autoCorrelation = true;
    setGlow(select('#auto-corr').node(), autoCorrelation);
    lowerGrid = true;
    setGlow(select('#lower-grid').node(), lowerGrid);
    tilted = false;
    setGlow(select('#tilt').node(), tilted);
  });
}

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
    .querySelector('#reset-colour')
    .addEventListener('click', function () {
      lowlightGrid(grid);
    });
}

function toggleAutoCorrelation(discs) {
  document.querySelector('#auto-corr').addEventListener('click', function () {
    autoCorrelation = !autoCorrelation;
    if (autoCorrelation) {
      fadeMeshes('show', discs, d => d.userData.value === 1);
      setGlow(this, autoCorrelation);
    } else {
      fadeMeshes('hide', discs, d => d.userData.value === 1);
      setGlow(this, autoCorrelation);
    }
  });
}

function toggleLowerGrid(grid, discs, colLabels) {
  document.querySelector('#lower-grid').addEventListener('click', function () {
    lowerGrid = !lowerGrid;
    if (lowerGrid) {
      toggleGrid('show', grid, 'fullGrid');
      fadeMeshes('show', colLabels, d => d.userData.col === 'quality');
      fadeMeshes('show', discs, d => d.userData.value === 1);
      fadeMeshes(
        'show',
        discs,
        d => d.userData.index[1] <= d.userData.index[0],
        0.01
      );
      setGlow(this, lowerGrid);

      autoCorrelation = true;
      setGlow(select('#auto-corr').node(), autoCorrelation);
    } else {
      toggleGrid('hide', grid, 'lowerGrid');
      fadeMeshes('hide', colLabels, d => d.userData.col === 'quality');
      fadeMeshes('hide', discs, d => d.userData.value === 1);
      fadeMeshes(
        'hide',
        discs,
        d => d.userData.index[1] <= d.userData.index[0],
        0.01
      );
      setGlow(this, lowerGrid);

      autoCorrelation = false;
      setGlow(select('#auto-corr').node(), autoCorrelation);
    }
  });
}

function toggleTilt(labels) {
  document.querySelector('#tilt').addEventListener('click', function () {
    tilted = !tilted;
    if (tilted) {
      tilt(labels);
      setGlow(this, tilted);
    } else {
      untilt(labels);
      setGlow(this, tilted);
    }
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

      autoCorrelation = false;
      setGlow(select('#auto-corr').node(), autoCorrelation);
      lowerGrid = false;
      setGlow(select('#lower-grid').node(), lowerGrid);
      tilted = false;
      setGlow(select('#tilt').node(), tilted);
    });
}

// Main attaching function.
function addListener(layout, grid, discs, colLabels, rowLabels) {
  fullGrid(grid, rowLabels, colLabels, discs);
  highlightSelect(layout, grid);
  resetGridColour(grid);
  toggleAutoCorrelation(discs);
  toggleLowerGrid(grid, discs, colLabels);
  toggleTilt(colLabels);
  showQuality(grid, discs, colLabels, rowLabels);
}

export default addListener;
