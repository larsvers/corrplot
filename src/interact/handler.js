import gsap from 'gsap/src/index';
import camera from '../core/camera';
import highlight from './highlight';
import state from '../core/state';

// Highlight.
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

// Fade func.
function fadeMeshes(toggle = 'show', group, filterFunc, staggerTime = 0.1) {
  const meshes = group.children.filter(filterFunc);
  const materials = meshes.map(d => d.material);

  if (toggle === 'hide') {
    gsap.timeline().to(materials, { opacity: 0, stagger: staggerTime });
  } else {
    gsap.timeline().to(materials, { opacity: 1, stagger: staggerTime });
  }
}

// Toggle funcs.
function pickGrid(aim, parent, ids) {
  if (aim === 'hide') {
    parent.children = state.grid.full.filter(mesh => !ids.includes(mesh.uuid));
  } else if (aim === 'show') {
    parent.children = state.grid.full;
  } else throw Error('wrong aim name');
}

function toggleGrid(aim, parent, filter = 'lowerGrid') {
  if (filter === 'lowerGrid') {
    const uuids = state.grid.lowerHalf.map(mesh => mesh.uuid);
    pickGrid(aim, parent, uuids);
  } else if (filter === 'qualityRow') {
    const uuids = state.grid.quality.map(mesh => mesh.uuid);
    pickGrid(aim, parent, uuids);
  } else throw Error('wrong filter name');
}

// Rotate labels.
function rotateSprites(sprites, degrees) {
  const radians = (degrees * Math.PI) / 180;
  const spriteMaterials = sprites.children.map(d => d.material);
  gsap.to(spriteMaterials, { rotation: radians, stagger: 0.015 });
}

// Tilt funcs.
function tiltDown(labels) {
  const up = { x: -1, y: 1, z: 0 };
  gsap.to(camera.up, up);
  rotateSprites(labels, 0);
}

function tiltUp(labels) {
  const up = { x: 0, y: 1, z: 0 };
  gsap.to(camera.up, up);
  rotateSprites(labels, 90);
}

// Focus funcs.
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

function focusAll() {
  function onUpdate() {
    camera.updateProjectionMatrix();
  }

  gsap
    .timeline({ onUpdate })
    .to(camera, { zoom: 1 }, 0)
    .to(camera.position, { x: 0, y: 0, z: 100 }, 0)
    .to(camera.up, { x: 0, y: 1, z: 0 }, 0)
    .to(controls.target, { x: 0, y: 0, z: 0 }, 0);
}

export {
  highlightCells,
  fadeMeshes,
  toggleGrid,
  tiltDown,
  tiltUp,
  rotateSprites,
  focusQuality,
  focusAll,
};
