// Libs, funcs, things.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/src/ScrollTrigger';
import { highlightCells, fadeOutMeshes } from '../interact/handler';
import { lowlightGrid } from '../interact/highlight';
import { layout, grid } from './init';

gsap.registerPlugin(ScrollTrigger);

function setScroll() {
  ScrollTrigger.create({
    trigger: 'p:nth-child(1)',
    start: 'center center',
    end: 'bottom center',
    id: 'hello',
    markers: true,
    onEnter: () =>
      highlightCells(layout, grid, 'citric acid | volatile acidity'),
    onLeaveBack: () => lowlightGrid(grid),
  });
}

function update() {
  setScroll();
}

export default update;
