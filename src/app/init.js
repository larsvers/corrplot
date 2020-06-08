/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { csv } from 'd3-fetch/src/index';
import { autoType } from 'd3-dsv/src/index';

import animate from './animate';
import scene from '../core/scene';
import camera from '../core/camera';
import { ambientLight, pointLight, pointLightFocus } from '../core/lights';
import controls from '../core/controls';
import prepData from './data';

import { bulb } from './helpers';
import getGrid from './makeGrid';
import getCorrLayout from './layoutCorr';
import getDiscs from './makeDiscs';
import getLabels from './makeLabels';

function ready(data) {
  // Controls.
  controls.rotateSpeed = 4.0;
  camera.position.set(0, 0, 100);
  controls.update();

  // Lights.
  camera.add(pointLight);
  scene.add(camera);
  scene.add(ambientLight);

  // Build plot.
  const size = 10;
  const corrData = prepData(data);
  const layout = getCorrLayout(corrData, { size, type: 'upper' });
  const grid = getGrid(layout, { size, colour: '#999' });
  const discs = getDiscs(layout, { size });
  const { colLabels, rowLabels } = getLabels(layout, { size });

  // Positioning.
  const dim = size * data.length;
  grid.position.set(-dim / 2.5, -dim / 2, 0);
  discs.position.set(-dim / 2.5, -dim / 2, 0);
  colLabels.position.set(-dim / 2.5, dim / 2, 0);
  rowLabels.position.set(-dim / 2, -dim / 2, 0);

  // Build scene.
  scene.add(grid);
  scene.add(discs);
  scene.add(colLabels);
  scene.add(rowLabels);

  // Add helpers.
  scene.add(bulb);
  scene.add(pointLightFocus);

  // Kick off animation.
  animate();
}

function init() {
  // Just load the data and call the main func.
  csv('../../data/corr.csv', autoType).then(ready);
  // csv('../../data/corr-s.csv', autoType).then(ready);
}

export default init;
