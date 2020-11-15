import gsap from 'gsap/src/index';
import camera from '../core/camera';
import highlight from './highlight';
import { removeMeshes } from '../app/utils';

/**
 * Gets the user selected value and triggers the highlight func.
 * @param { Array } layout The layout
 * @param { Object3D } grid The grid (lines and planes) .
 */
function highlightCells(layout, grid, string) {
  // Get the values from the `select` element's values.
  const value = string ? string.split(' | ') : this.value.split(' | ');

  // Highlight the cell/s.
  highlight(layout, grid, {
    row: value[0],
    col: value[1],
    single: false,
  });
}

/**
 * Fades out and removes meshes.
 * @param { Object3D } group The group of objects (scene, group, ...).
 * @param { Function } filterFunc The function to filter the meshes from the group
 * @param { Number } staggerTime Stagger duration
 */
function fadeOutMeshes(group, filterFunc, staggerTime = 0.1, scaling = true) {
  const meshes = group.children.filter(filterFunc);
  const materials = meshes.map(d => d.material);
  const scales = meshes.map(d => d.scale);

  if (scaling) {
    gsap
      .timeline()
      .to(scales, { y: 0.1, stagger: staggerTime }, 0)
      .to(materials, { opacity: 0, stagger: staggerTime }, 0)
      .eventCallback('onComplete', removeMeshes, [group, meshes]);
  } else {
    gsap
      .timeline()
      .to(materials, { opacity: 0 }, 0)
      .eventCallback('onComplete', removeMeshes, [group, meshes]);
  }
}

function rotateSprites(sprites, degrees) {
  const radians = (degrees * Math.PI) / 180;
  const spriteMaterials = sprites.children.map(d => d.material);
  gsap.to(spriteMaterials, { rotation: radians });
}

function focusQuality(labels) {
  // Camera move/zoom
  const zoom = { zoom: 1.5 };
  const to = { x: 50, y: -100, z: 20 };
  const up = { x: 0, y: 0, z: 1 };
  // const at = { x: 15, y: 0, z: 0 };

  function onUpdate() {
    camera.updateProjectionMatrix();
  }

  gsap
    .timeline({ onUpdate })
    .to(camera, zoom, 0)
    .to(camera.position, to, 0)
    .to(camera.up, up, 0);
  // .to(controls.target, at, 0); // target seemingly not available

  rotateSprites(labels, 90);
}

export { highlightCells, fadeOutMeshes, rotateSprites, focusQuality };
