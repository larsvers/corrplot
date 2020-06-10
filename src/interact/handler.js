import gsap from 'gsap/src/index';
import highlight from './highlight';
import { removeMeshes } from '../app/utils';

/**
 * Gets the user selected value and triggers the highlight func.
 * @param { Array } layout The layout
 * @param { Object3D } grid The grid (lines and planes) .
 */
function highlightCells(layout, grid) {
  // Get the values from the `select` element's values.
  const value = this.value.split(' | ');

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
function fadeOutMeshes(group, filterFunc, staggerTime = 0.1) {
  const meshes = group.children.filter(filterFunc);
  const materials = meshes.map(d => d.material);
  const scales = meshes.map(d => d.scale);

  gsap
    .timeline()
    .to(scales, { y: 0.1, stagger: staggerTime }, 0)
    .to(materials, { opacity: 0, stagger: staggerTime }, 0)
    .eventCallback('onComplete', removeMeshes, [group, meshes]);
}

export { highlightCells, fadeOutMeshes };
