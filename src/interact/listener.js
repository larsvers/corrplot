/* eslint-disable import/no-cycle */
import gsap from 'gsap/src/index';
import camera from '../core/camera';
import controls from '../core/controls';
import { highlightCells, fadeOutMeshes } from './handler';
import { lowlight } from './highlight';

// Actions.
function highlightSelect(layout, grid) {
  document
    .querySelector('#highlight-select')
    .addEventListener('change', function() {
      // Use `.call` to pass through `this`.
      highlightCells.call(this, layout, grid);
    });
}

function resetGridColour(grid) {
  document
    .querySelector('#reset-grid-colour')
    .addEventListener('click', function() {
      lowlight(
        grid.children.filter(d => d.type === 'Mesh').map(d => d.material)
      );
    });
}

function removeAutoCorrelation(discs) {
  document
    .querySelector('#remove-auto-corr')
    .addEventListener('click', function() {
      fadeOutMeshes(discs, d => d.userData.value === 1);
    });
}

function removeLowerDiscs(discs) {
  document
    .querySelector('#remove-lower-discs')
    .addEventListener('click', function() {
      fadeOutMeshes(
        discs,
        d => d.userData.index[1] <= d.userData.index[0],
        0.01
      );
    });
}

function removeLowerGrid(grid, colLabels) {
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
}

function removeAllButQuality(discs, grid, rowLabels) {
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

function focusOnQuality() {
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
  }

  // Add listener.
  document
    .querySelector('#move-camera-position')
    .addEventListener('click', move);
}

// Main attaching function.
function addListener(layout, grid, discs, colLabels, rowLabels) {
  highlightSelect(layout, grid);
  resetGridColour(grid);
  removeAutoCorrelation(discs);
  removeLowerDiscs(discs);
  removeLowerGrid(grid, colLabels);
  removeAllButQuality(discs, grid, rowLabels);
  focusOnQuality();
}

export default addListener;
