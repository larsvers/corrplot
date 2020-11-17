/* eslint-disable import/no-cycle */
import gsap from 'gsap/src/index';
import camera from '../core/camera';
import controls from '../core/controls';
import {
  highlightCells,
  fadeMeshes,
  toggleGrid,
  tiltDown,
  tiltUp,
  rotateSprites,
  focusAll,
} from './handler';
import { lowlightGrid } from './highlight';

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

function removeAutoCorrelation(discs) {
  document
    .querySelector('#remove-auto-corr')
    .addEventListener('click', function () {
      fadeMeshes('hide', discs, d => d.userData.value === 1);
    });
}

function removeLowerDiscs(discs) {
  document
    .querySelector('#remove-lower-discs')
    .addEventListener('click', function () {
      fadeMeshes(
        'hide',
        discs,
        d => d.userData.index[1] <= d.userData.index[0],
        0.01
      );
    });
}

function removeLowerGrid(grid, colLabels) {
  document
    .querySelector('#remove-lower-grid')
    .addEventListener('click', function () {
      toggleGrid('hide', grid);
      // Remove label.
      fadeMeshes('hide', colLabels, d => d.userData.col === 'quality');
    });
}

function addLowerGrid(grid, colLabels) {
  document
    .querySelector('#add-lower-grid')
    .addEventListener('click', function () {
      toggleGrid('show', grid);
      // Add label.
      fadeMeshes('show', colLabels, d => d.userData.col === 'quality');
    });
}

function addLowerDiscs(discs) {
  document
    .querySelector('#add-lower-discs')
    .addEventListener('click', function () {
      fadeMeshes(
        'show',
        discs,
        d => d.userData.index[1] <= d.userData.index[0],
        0.01
      );
    });
}

function removeAllButQuality(discs, grid, rowLabels) {
  document
    .querySelector('#remove-all-but-quality')
    .addEventListener('click', function () {
      // Fade out the discs.
      fadeMeshes('hide', discs, d => d.userData.row !== 'quality', 0.01);
      // Fade out the labels.
      fadeMeshes('hide', rowLabels, d => d.userData.row !== 'quality');
      // Fade out the grid.
      toggleGrid('hide', grid, 'qualityRow');
    });
}

function addAllButQuality(discs, grid, rowLabels) {
  document
    .querySelector('#add-all-but-quality')
    .addEventListener('click', function () {
      // Fade out the discs.
      fadeMeshes('show', discs, d => d.userData.row !== 'quality', 0.01);
      // Fade out the labels.
      fadeMeshes('show', rowLabels, d => d.userData.row !== 'quality');
      // Fade out the grid.
      toggleGrid('show', grid, 'qualityRow');
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

function focusOnQuality(labels) {
  // Camera move/zoom
  const zoom = { zoom: 1.5 };
  const to = { x: 60, y: -100, z: 20 };
  const up = { x: 0, y: 0, z: 1 };
  const at = { x: 15, y: 0, z: 0 };

  function onUpdate() {
    camera.updateProjectionMatrix();
  }

  function move() {
    gsap
      .timeline({ onUpdate })
      .to(camera, zoom, 0)
      .to(camera.position, to, 0)
      .to(camera.up, up, 0)
      .to(controls.target, at, 0);

    rotateSprites(labels, 90);
  }

  // Add listener.
  document
    .querySelector('#move-camera-position')
    .addEventListener('click', move);
}

function setCameraBack() {
  // Add listener.
  document
    .querySelector('#move-camera-back')
    .addEventListener('click', focusAll);
}

// Main attaching function.
function addListener(layout, grid, discs, colLabels, rowLabels) {
  highlightSelect(layout, grid);
  resetGridColour(grid);
  removeAutoCorrelation(discs);
  removeLowerDiscs(discs);
  removeLowerGrid(grid, colLabels);
  addLowerGrid(grid, colLabels);
  addLowerDiscs(discs);
  tiltGrid(colLabels);
  tiltGridBack(colLabels);
  removeAllButQuality(discs, grid, rowLabels);
  addAllButQuality(discs, grid, rowLabels);
  focusOnQuality(colLabels);
  setCameraBack();
}

export default addListener;
