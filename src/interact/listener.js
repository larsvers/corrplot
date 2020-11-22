/* eslint-disable import/no-cycle */
import { select } from 'd3-selection/src';
import { gsap } from 'gsap';
import {
  highlightCells,
  fadeMeshes,
  toggleGrid,
  tilt,
  untilt,
  focusAll,
  focusQuality,
} from './handler';
import { lowlightGrid } from './highlight';

let autoCorrelation = true;
let lowerGrid = true;
let tilted = false;
let interactive = false;

// Helper.
function setGlow(self, flag) {
  select(self).select('.outer').classed('glow-on', flag);
  select(self).select('.outer').classed('glow-off', !flag);
}

function showFullGrid(grid, rowLabels, colLabels, discs) {
  focusAll();
  toggleGrid('show', grid, 'fullGrid');
  fadeMeshes('show', colLabels, d => d);
  fadeMeshes('show', rowLabels, d => d);
  fadeMeshes('show', discs, d => d, 0.01);

  autoCorrelation = true;
  setGlow(select('#auto-corr').node(), autoCorrelation);
  lowerGrid = true;
  setGlow(select('#lower-grid').node(), lowerGrid);
  tilted = false;
  setGlow(select('#tilt').node(), tilted);
}

// Listener/handler.
function fullGrid(grid, rowLabels, colLabels, discs) {
  document.querySelector('#full-grid').addEventListener('click', function () {
    showFullGrid(grid, rowLabels, colLabels, discs);
  });
}

function highlightSelect(layout, grid) {
  document
    .querySelector('#highlight-select')
    .addEventListener('change', function () {
      // Use `.call` to pass through `this`.
      highlightCells.call(this, layout, grid);
    });
}

function resetGridColour(grid) {
  document
    .querySelector('#reset-colour')
    .addEventListener('click', function () {
      lowlightGrid(grid);
    });
}

function toggleAutoCorrelation(discs) {
  document.querySelector('#auto-corr').addEventListener('click', function () {
    autoCorrelation = !autoCorrelation;
    if (autoCorrelation) {
      fadeMeshes('show', discs, d => d.userData.value === 1);
      setGlow(this, autoCorrelation);
    } else {
      fadeMeshes('hide', discs, d => d.userData.value === 1);
      setGlow(this, autoCorrelation);
    }
  });
}

function toggleLowerGrid(grid, discs, rowLabels, colLabels) {
  document.querySelector('#lower-grid').addEventListener('click', function () {
    lowerGrid = !lowerGrid;
    if (lowerGrid) {
      toggleGrid('show', grid, 'fullGrid');
      fadeMeshes('show', colLabels, d => d.userData.col === 'quality');
      fadeMeshes('show', rowLabels, d => d);
      fadeMeshes('show', discs, d => d.userData.value === 1);
      fadeMeshes(
        'show',
        discs,
        d => d.userData.index[1] <= d.userData.index[0],
        0.01
      );
      setGlow(this, lowerGrid);

      autoCorrelation = true;
      setGlow(select('#auto-corr').node(), autoCorrelation);
    } else {
      toggleGrid('hide', grid, 'lowerGrid');
      fadeMeshes('hide', colLabels, d => d.userData.col === 'quality');
      fadeMeshes('hide', rowLabels, d => d.userData.row === 'fixed acidity');
      fadeMeshes('hide', discs, d => d.userData.value === 1);
      fadeMeshes(
        'hide',
        discs,
        d => d.userData.index[1] <= d.userData.index[0],
        0.01
      );
      setGlow(this, lowerGrid);

      autoCorrelation = false;
      setGlow(select('#auto-corr').node(), autoCorrelation);
    }
  });
}

function toggleTilt(labels) {
  document.querySelector('#tilt').addEventListener('click', function () {
    tilted = !tilted;
    if (tilted) {
      tilt(labels);
      setGlow(this, tilted);
    } else {
      untilt(labels);
      setGlow(this, tilted);
    }
  });
}

function showQuality(grid, discs, colLabels, rowLabels) {
  document
    .querySelector('#show-quality')
    .addEventListener('click', function () {
      focusAll();
      toggleGrid('hide', grid, 'qualityRow');
      fadeMeshes(
        'hide',
        discs,
        d => d.userData.row !== 'quality' || d.userData.value === 1,
        0.01
      );
      fadeMeshes('hide', colLabels, d => d.userData.col === 'quality');
      fadeMeshes('hide', rowLabels, d => d.userData.row !== 'quality');
      focusQuality(colLabels);

      autoCorrelation = false;
      setGlow(select('#auto-corr').node(), autoCorrelation);
      lowerGrid = false;
      setGlow(select('#lower-grid').node(), lowerGrid);
      tilted = false;
      setGlow(select('#tilt').node(), tilted);
    });
}

function setButtonStyle(flag) {
  select('#big-button-inner').classed('pressed-button', flag);
  select('#big-button-bulb').classed('pressed-bulb', flag);
}

function setUi(flag) {
  // Move and resize button.
  select('#big-button-wrap').classed('aside', flag);
  select('#big-button-container').classed('small', flag);
  select('#big-button-text').classed('shrink', flag);

  // Change text.
  select('#big-button-text').style('opacity', 0);
  select('#big-button-text').html(flag ? 'Scroll' : 'Interact');
  gsap.to('#big-button-text', { opacity: 1, duration: 0.4 });

  // Change pointer events.
  select('#play, #text-container').classed('interact', flag);
  select('#play').classed('clear', flag);

  // Toggle side buttons.
  // eslint-disable-next-line no-unused-expressions
  flag
    ? gsap.to('.action', { left: '0vw', stagger: 0.1 })
    : gsap.to('.action', { left: '-50vw', stagger: 0.1 });
}

function toggleInteractivity(grid, rowLabels, colLabels, discs) {
  document
    .querySelector('#big-button-inner')
    .addEventListener('click', function () {
      interactive = !interactive;
      setButtonStyle(interactive);
      setUi(interactive);
      if (interactive) showFullGrid(grid, rowLabels, colLabels, discs);
    });
}

// Main attaching function.
function addListener(layout, grid, discs, colLabels, rowLabels) {
  fullGrid(grid, rowLabels, colLabels, discs);
  highlightSelect(layout, grid);
  resetGridColour(grid);
  toggleAutoCorrelation(discs);
  toggleLowerGrid(grid, discs, rowLabels, colLabels);
  toggleTilt(colLabels);
  showQuality(grid, discs, colLabels, rowLabels);

  toggleInteractivity(grid, rowLabels, colLabels, discs);
}

export default addListener;
