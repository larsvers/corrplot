import {
  CylinderGeometry,
  MeshLambertMaterial,
  MeshPhongMaterial,
  Mesh,
  Group,
  ConeGeometry,
} from 'three/build/three.module';

import { scaleLinear, scaleSequential } from 'd3-scale/src/index';
import { interpolateRdBu } from 'd3-scale-chromatic/src/index';

function getDiscs(data, { size = 1 } = {}) {
  const grid = new Group();

  // Scales
  const widthScale = scaleLinear()
    .domain([0, 1])
    .range([0, (size * 0.9) / 2]);

  const heightScale = scaleLinear()
    .domain([0, 1])
    .range([0, size * 6]);

  const colourScale = scaleSequential(interpolateRdBu).domain([-1, 1]);

  // z-index correction.
  const corr = 0.001;

  // Build out the disc grid.
  data.forEach(d => {
    // Scaled values.
    const width = widthScale(Math.abs(d.value));
    const height = heightScale(Math.abs(d.value));
    const col = colourScale(d.value);

    // Make discs.
    const geo = new CylinderGeometry(width, width, height, 20, 10, false);
    // const geo = new ConeGeometry(width, height);
    const mat = new MeshPhongMaterial({
      color: col,
      transparent: true,
    });
    const mesh = new Mesh(geo, mat);

    // Add data and name.
    mesh.userData = d;
    mesh.name = `${d.row} | ${d.col}`;

    // Position discs.
    mesh.rotateX(Math.PI / 2);
    // mesh.rotateX(d.value > 0 ? Math.PI / 2 : -Math.PI / 2);
    mesh.position.set(
      d.position[0],
      d.position[1],
      d.value > 0 ? height / 2 + corr : -height / 2 - corr
    );

    mesh.castShadow = true;

    grid.add(mesh);
  });

  return grid;
}

export default getDiscs;
