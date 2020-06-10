/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */

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

export { setRendererSize, removeMeshes };
