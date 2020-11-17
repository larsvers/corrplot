// Libs, funcs, things.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/src/ScrollTrigger';
import camera from '../core/camera';
import {
  tweenZoom,
  highlightCells,
  fadeMeshes,
  toggleGrid,
  rotateSprites,
  focusQuality,
  focusAll,
} from '../interact/handler';
import { lowlightGrid } from '../interact/highlight';
import { layout, grid, discs, rowLabels, colLabels } from './init';

gsap.registerPlugin(ScrollTrigger);

function setScroll() {
  ScrollTrigger.create({
    animation: tweenZoom,
    trigger: '#section-00',
    start: 'center center',
    end: 'bottom center',
    id: 'zoomIn',
    scrub: true,
  });

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
    id: 'autocorrelation',
    // markers: true,
    onEnter: () => fadeMeshes('hide', discs, d => d.userData.value === 1),
    onLeaveBack: () => fadeMeshes('show', discs, d => d.userData.value === 1),
  });

  ScrollTrigger.create({
    trigger: '#section-06',
    start: 'center center',
    end: 'bottom center',
    id: 'lowerFade',
    // markers: true,
    onEnter: () =>
      fadeMeshes(
        'hide',
        discs,
        d => d.userData.index[1] <= d.userData.index[0],
        0.01
      ),
    onLeaveBack: () =>
      fadeMeshes('show', discs, d => d.userData.value !== 1, 0.01),
  });

  ScrollTrigger.create({
    trigger: '#section-07',
    start: 'center center',
    end: 'bottom center',
    id: 'lowerRemove',
    // markers: true,
    onEnter() {
      toggleGrid('hide', grid, 'lowerGrid');
      fadeMeshes('hide', colLabels, d => d.userData.col === 'quality');
    },
    onLeaveBack() {
      toggleGrid('show', grid, 'fullGrid');
      fadeMeshes('show', colLabels, d => d.userData.col === 'quality');
    },
  });

  ScrollTrigger.create({
    trigger: '#section-08',
    start: 'center center',
    end: 'bottom center',
    id: 'tilt',
    // markers: true,
    onEnter() {
      gsap.to(camera.up, { x: -1, y: 1, z: 0 });
      rotateSprites(colLabels, 0);
    },
    onLeaveBack() {
      gsap.to(camera.up, { x: 0, y: 1, z: 0 });
      rotateSprites(colLabels, 90);
    },
  });

  ScrollTrigger.create({
    trigger: '#section-09',
    start: 'center center',
    end: 'bottom center',
    id: 'lowerRemove',
    // markers: true,
    onEnter() {
      fadeMeshes('hide', discs, d => d.userData.row !== 'quality', 0.01);
      fadeMeshes('hide', rowLabels, d => d.userData.row !== 'quality', 0.1);
      toggleGrid('hide', grid, 'qualityRow');
    },
    onLeaveBack() {
      fadeMeshes(
        'show',
        discs,
        d => d.userData.index[1] > d.userData.index[0],
        0.01
      );
      fadeMeshes('show', rowLabels, d => d, 0.1);
      toggleGrid('show', grid, 'upperGrid');
    },
  });

  ScrollTrigger.create({
    trigger: '#section-10',
    start: 'center center',
    end: 'bottom center',
    id: 'qualityFocus',
    // markers: true,
    onEnter: () => focusQuality(colLabels),
    onLeaveBack: () => focusAll(colLabels),
  });
}

function update() {
  setScroll();
}

export default update;
