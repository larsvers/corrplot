// Libs, funcs, things.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/src/ScrollTrigger';
import camera from '../core/camera';
import {
  highlightCells,
  fadeOutMeshes,
  rotateSprites,
  focusQuality,
} from '../interact/handler';
import { lowlightGrid } from '../interact/highlight';
import { layout, grid, discs, rowLabels, colLabels } from './init';

gsap.registerPlugin(ScrollTrigger);

function setScroll() {
  ScrollTrigger.create({
    trigger: '#section-01',
    start: 'center center',
    end: 'bottom center',
    id: 'highlight',
    // markers: true,
    onEnter: () => highlightCells(layout, grid, 'pH | citric acid'),
    onLeaveBack: () => lowlightGrid(grid),
  });

  ScrollTrigger.create({
    trigger: '#section-02',
    start: 'center center',
    end: 'bottom center',
    id: 'highlight',
    // markers: true,
    onEnter: () => highlightCells(layout, grid, 'alcohol | density'),
    onLeaveBack: () => highlightCells(layout, grid, 'pH | citric acid'),
  });

  ScrollTrigger.create({
    trigger: '#section-03',
    start: 'center center',
    end: 'bottom center',
    id: 'highlight',
    // markers: true,
    onEnter: () => highlightCells(layout, grid, 'quality | alcohol'),
    onLeaveBack: () => highlightCells(layout, grid, 'alcohol | density'),
  });

  ScrollTrigger.create({
    trigger: '#section-04',
    start: 'center center',
    end: 'bottom center',
    id: 'highlight',
    // markers: true,
    onEnter: () => lowlightGrid(grid),
    onLeaveBack: () => highlightCells(layout, grid, 'quality | alcohol'),
  });

  ScrollTrigger.create({
    trigger: '#section-05',
    start: 'center center',
    end: 'bottom center',
    id: 'meshFade',
    markers: true,
    onEnter: () => fadeOutMeshes(discs, d => d.userData.value === 1),
  });

  ScrollTrigger.create({
    trigger: '#section-06',
    start: 'center center',
    end: 'bottom center',
    id: 'lowerFade',
    markers: true,
    onEnter: () =>
      fadeOutMeshes(
        discs,
        d => d.userData.index[1] <= d.userData.index[0],
        0.01
      ),
  });

  ScrollTrigger.create({
    trigger: '#section-07',
    start: 'center center',
    end: 'bottom center',
    id: 'lowerRemove',
    markers: true,
    onEnter() {
      fadeOutMeshes(
        grid,
        d => d.userData.index[1] <= d.userData.index[0],
        0.01,
        false
      );
      fadeOutMeshes(colLabels, d => d.userData.col === 'quality', 0.1);
    },
  });

  ScrollTrigger.create({
    trigger: '#section-08',
    start: 'center center',
    end: 'bottom center',
    id: 'tilt',
    markers: true,
    onEnter() {
      gsap.to(camera.up, { x: -1, y: 1, z: 0 });
      rotateSprites(colLabels, 0);
    },
  });

  ScrollTrigger.create({
    trigger: '#section-09',
    start: 'center center',
    end: 'bottom center',
    id: 'lowerRemove',
    markers: true,
    onEnter() {
      // Fade out discs, grid, labels.
      fadeOutMeshes(discs, d => d.userData.row !== 'quality', 0.01);
      fadeOutMeshes(grid, d => d.userData.row !== 'quality', 0.01, false);
      fadeOutMeshes(rowLabels, d => d.userData.row !== 'quality', 0.1);
    },
  });

  ScrollTrigger.create({
    trigger: '#section-10',
    start: 'center center',
    end: 'bottom center',
    id: 'qualityFocus',
    markers: true,
    onEnter() {
      focusQuality(colLabels);
    },
  });
}

function update() {
  setScroll();
}

export default update;
