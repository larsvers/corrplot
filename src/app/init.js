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
import getLabels from './makeLabels';

function ready(data) {
  controls.rotateSpeed = 4.0;
  camera.position.set(0, 0, 100);
  controls.update();

  camera.add(pointLight);
  scene.add(camera);
  scene.add(ambientLight);

  const ah1 = new AxesHelper(20);
  scene.add(ah1);

  // Build plot.
  const size = 10;
  const corrData = prepData(data);
  const layout = getCorrLayout(corrData, { size });
  const grid = getGrid(layout, { size, colour: '#999' });
  const discs = getDiscs(layout, { size });
  const labels = getLabels(layout, { size });

  // Move plot to center.
  grid.position.set((-size * data.length) / 2.5, (-size * data.length) / 2, 0);
  discs.position.set((-size * data.length) / 2.5, (-size * data.length) / 2, 0);
  labels.position.set(
    (-size * data.length) / 2,
    (-size * data.length) / 2 + size,
    0
  );

  scene.add(grid);
  scene.add(discs);
  scene.add(labels);
}

function init() {
  // Just load the data and call the main func.
  csv('../../data/corr.csv', autoType).then(ready);
  // csv('../../data/corr-s.csv', autoType).then(ready);
}

export default init;
