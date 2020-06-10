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
 * Removes the autocorrelations.
 * @param { Object3D } discs The grid of cylinders.
 */
function autoCorrelation(discs) {
  const autoCorrs = discs.children.filter(d => d.userData.value === 1);
  const materials = autoCorrs.map(d => d.material);
  const scales = autoCorrs.map(d => d.scale);

  gsap
    .timeline()
    .to(scales, { y: 0.1, stagger: 0.1 }, 0)
    .to(materials, { opacity: 0, stagger: 0.1 }, 0)
    .eventCallback('onComplete', removeMeshes, [discs, autoCorrs]);
}

export { highlightCells, autoCorrelation };
