/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { csv } from 'd3-fetch/src/index';
import { autoType } from 'd3-dsv/src/index';

import { CameraHelper } from 'three/build/three.module';
import animate from './animate';
import scene from '../core/scene';
import camera from '../core/camera';
import controls from '../core/controls';
import { ambientLight, pointLight, directionalLight } from '../core/lights';

import prepData from './data';
import getBox from './makeBox';
import getGrid from './makeGrid';
import getCorrLayout from './layoutCorr';
import getDiscs from './makeDiscs';
import getLabels from './makeLabels';
import buildDropdown from '../ui/buildDropdown';
import addListener from '../interact/listener';
import { ah } from './utils';

// Variables the init module exports
let box;

function ready(data) {
  // Controls.
  controls.rotateSpeed = 4.0;
  camera.position.set(0, 0, 100);
  controls.update();

  // Lights.
  camera.add(pointLight);
  scene.add(camera);
  scene.add(ambientLight);

  directionalLight.position.set(0, -100, 0);
  directionalLight.shadow.camera.left = -100;
  directionalLight.shadow.camera.right = 100;
  directionalLight.shadow.camera.top = 100;
  directionalLight.shadow.camera.bottom = -100;
  directionalLight.shadow.camera.far = 1000;
  console.log(directionalLight.shadow.camera);
  scene.add(directionalLight);

  const ch = new CameraHelper(directionalLight.shadow.camera);
  scene.add(ch);
  scene.add(ah);

  // Build plot.
  const size = 10;
  const corrData = prepData(data);
  const layout = getCorrLayout(corrData, { size, type: 'full' });
  box = getBox();
  const grid = getGrid(layout, { size, colour: '#999' });
  const discs = getDiscs(layout, { size });
  const labels = getLabels(layout, { size });
  const rowLabels = labels.rowLabels;
  const colLabels = labels.colLabels;

  // Positioning.
  const dim = size * data.length;
  grid.position.set(-dim / 2.5, -dim / 2, 0);
  discs.position.set(-dim / 2.5, -dim / 2, 0);
  colLabels.position.set(-dim / 2.5, dim / 2, 0);
  rowLabels.position.set(-dim / 2, -dim / 2, 0);

  // Build scene.
  scene.add(box);
  scene.add(grid);
  scene.add(discs);
  scene.add(colLabels);
  scene.add(rowLabels);

  // Kick off animation.
  animate();

  // Build UI.
  buildDropdown(layout);

  // Add listeners.
  addListener(layout, grid, discs, colLabels, rowLabels);

  // camera.rotation.y = Math.PI / 2;
  // camera.updateProjectionMatrix();
  // console.log(camera.rotation.y);
}

function init() {
  // Just load the data and call the main func.
  csv('../../data/corr.csv', autoType).then(ready);
  // csv('../../data/corr-s.csv', autoType).then(ready);
}
export default init;
export { box };
