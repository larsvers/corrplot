/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */

import { AxesHelper } from 'three/build/three.module';

/**
 * Sets the renderer's canvas width based on the available width
 * and returns a boolean flag that can be used to update other stuff.
 * @param { WebGLRenderer } renderer
 * @returns { Boolean } Flag to use for updating other stuff on resize.
 */
function setRendererSize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) renderer.setSize(width, height, false);
  return needResize;
}

/**
 * Removes given meshes from the specified parent (scene or group, ...).
 * @param { Object3D } parent The parent element from which to remove the meshes
 * @param { Array } meshes The meshes to remove
 */
function removeMeshes(parent, meshes) {
  const uuids = meshes.map(mesh => mesh.uuid);
  parent.children = parent.children.filter(mesh => !uuids.includes(mesh.uuid));
}

/**
 * Returns a point of a vector of a given degree angle about the z axis.
 * @param { Number } angle The angle
 * @param { String } type  Either 'degree' or 'radian'
 * @returns { Object } x and y coordinates of vector with given degrees.
 */
function getUpfromAngle(angle, type = 'degree') {
  const factor = type === 'degree' ? Math.PI / 180 : 1;
  const x = Math.cos(angle * factor);
  const y = Math.sin(angle * factor);
  return { x, y };
}

const ah = new AxesHelper(100);

export { setRendererSize, removeMeshes, getUpfromAngle, ah };
