/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { csv } from 'd3-fetch/src/index';
import { autoType } from 'd3-dsv/src/index';

import animate from './animate';
import scene from '../core/scene';
import camera from '../core/camera';
import controls from '../core/controls';
import { ambientLight, pointLight } from '../core/lights';

import prepData from './data';
import getBox from './makeBox';
import getGrid from './makeGrid';
import getCorrLayout from './layoutCorr';
import getDiscs from './makeDiscs';
import getLabels from './makeLabels';
import buildDropdown from '../ui/buildDropdown';
import addListener from '../interact/listener';
import update from './update';
import { setGridMeshes } from './utils';

// Variables the init module exports
let layout;
let grid;
let box;
let discs;
let labels;
let rowLabels;
let colLabels;

function ready(data) {
  // Controls.
  controls.rotateSpeed = 4.0;
  camera.position.set(0, 0, 100);
  camera.zoom = 0;
  controls.update();

  // Lights.
  camera.add(pointLight);
  scene.add(camera);
  scene.add(ambientLight);

  // Build plot.
  const size = 10;
  const corrData = prepData(data);
  layout = getCorrLayout(corrData, { size, type: 'full' });
  box = getBox();
  grid = getGrid(layout, { size, colour: '#999' });
  discs = getDiscs(layout, { size });
  labels = getLabels(layout, { size });
  rowLabels = labels.rowLabels;
  colLabels = labels.colLabels;

  // Grid parts.
  setGridMeshes(grid);

  // Positioning.
  const dim = size * data.length;
  grid.position.set(-dim / 2.5, -dim / 2, 0);
  discs.position.set(-dim / 2.5, -dim / 2, 0);
  colLabels.position.set(-dim / 2.5, dim / 2, 0);
  rowLabels.position.set(-dim / 2, -dim / 2, 0);

  // Build scene.
  // scene.add(box);
  scene.add(grid);
  scene.add(discs);
  scene.add(colLabels);
  scene.add(rowLabels);

  // Kick off animation.
  animate();

  // Update.
  update();

  // Build UI.
  buildDropdown(layout);

  // Add listeners.
  addListener(layout, grid, discs, colLabels, rowLabels);
}

function init() {
  // Just load the data and call the main func.
  csv('../../data/corr.csv', autoType).then(ready);
  // window.addEventListener('resize', update);
}

export default init;
export { layout, grid, box, discs, labels, rowLabels, colLabels };
