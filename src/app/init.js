/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import {
  IcosahedronBufferGeometry,
  Mesh,
  MeshStandardMaterial,
} from 'three/build/three.module';

import { csv } from 'd3-fetch/src/index';
import scene from '../core/scene';
import camera from '../core/camera';
import { ambientLight, pointLight } from '../core/lights';
import controls from '../core/controls';

function init() {
  // Just load the data and call the main func.
  csv('../../data/corr.csv').then(ready);
}

function ready(data) {
  controls.rotateSpeed = 4.0;
  camera.position.set(0, 0, 10);
  controls.update();

  pointLight.position.set(-5, 5, 5);
  scene.add(ambientLight, pointLight);

  const geo = new IcosahedronBufferGeometry(1, 1);
  const mat = new MeshStandardMaterial({ color: '#777', flatShading: true });
  const mesh = new Mesh(geo, mat);

  scene.add(mesh);
}

export default init;
