// Libs, funcs, things.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/src/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/src/ScrambleTextPlugin';
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
// eslint-disable-next-line import/no-cycle
import { layout, grid, discs, rowLabels, colLabels } from './init';

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

function setScroll() {
  ScrollTrigger.create({
    animation: tweenZoom,
    trigger: '#section-0',
    start: 'bottom center',
    endTrigger: '#section-1',
    end: 'top bottom',
    id: 'zoomIn',
    scrub: true,
    // markers: true,
  });

  ScrollTrigger.create({
    trigger: '#section-1',
    start: 'bottom 25%',
    end: 'bottom top',
    id: 'highlight-1',
    // markers: true,
    onEnter: () => highlightCells(layout, grid, 'pH | citric acid'),
    onLeaveBack: () => lowlightGrid(grid),
  });

  ScrollTrigger.create({
    trigger: '#section-2',
    start: 'bottom 25%',
    end: 'bottom top',
    id: 'highlight-2',
    // markers: true,
    onEnter: () => highlightCells(layout, grid, 'alcohol | density'),
    onLeaveBack: () => highlightCells(layout, grid, 'pH | citric acid'),
  });

  ScrollTrigger.create({
    trigger: '#section-3',
    start: 'bottom 25%',
    end: 'bottom top',
    id: 'highlight-3',
    // markers: true,
    onEnter: () => highlightCells(layout, grid, 'quality | alcohol'),
    onLeaveBack: () => highlightCells(layout, grid, 'alcohol | density'),
  });

  ScrollTrigger.create({
    trigger: '#section-4',
    start: 'bottom 25%',
    end: 'bottom top',
    id: 'autocorrelation',
    // markers: true,
    onEnter() {
      lowlightGrid(grid);
      fadeMeshes('hide', discs, d => d.userData.value === 1);
    },
    onLeaveBack: () => fadeMeshes('show', discs, d => d.userData.value === 1),
  });

  ScrollTrigger.create({
    trigger: '#section-5',
    start: 'bottom 25%',
    end: 'bottom top',
    id: 'lowerFade',
    // markers: true,
    onEnter() {
      fadeMeshes(
        'hide',
        discs,
        d => d.userData.index[1] <= d.userData.index[0],
        0.01
      );
      toggleGrid('hide', grid, 'lowerGrid');
      fadeMeshes('hide', colLabels, d => d.userData.col === 'quality');
    },
    onLeaveBack() {
      fadeMeshes('show', discs, d => d.userData.value !== 1, 0.01);
      toggleGrid('show', grid, 'fullGrid');
      fadeMeshes('show', colLabels, d => d.userData.col === 'quality');
    },
  });

  ScrollTrigger.create({
    trigger: '#section-6',
    start: 'bottom 25%',
    end: 'bottom top',
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
    trigger: '#section-7',
    start: 'bottom 25%',
    end: 'bottom top',
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
    trigger: '#section-8',
    start: 'bottom 25%',
    end: 'bottom top',
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
