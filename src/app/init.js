/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { csv } from 'd3-fetch/src/index';
import { autoType } from 'd3-dsv/src/index';
import { AxesHelper } from 'three/build/three.module';
import scene from '../core/scene';
import camera from '../core/camera';
import { ambientLight, pointLight } from '../core/lights';
import controls from '../core/controls';
import prepData from './data';

import getGrid from './makeGrid';
import getCorrLayout from './layoutCorr';
import getDiscs from './makeDiscs';

function ready(data) {
  controls.rotateSpeed = 4.0;
  camera.position.set(0, 0, 100);
  controls.update();

  pointLight.position.set(-50, 50, 50);
  scene.add(ambientLight, pointLight);

  const ah1 = new AxesHelper(10);
  scene.add(ah1);

  const corrData = prepData(data);
  const layout = getCorrLayout(corrData, { size: 10 });
  const grid = getGrid(layout, { size: 10, colour: '#777' });
  const discs = getDiscs(layout, { size: 10 });

  scene.add(grid);
  scene.add(discs);
}

function init() {
  // Just load the data and call the main func.
  csv('../../data/corr.csv', autoType).then(ready);
}

export default init;
