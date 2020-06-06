import {
  CylinderGeometry,
  MeshLambertMaterial,
  Mesh,
  Group,
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

  // Build out the disc grid.
  data.forEach(d => {
    // Scaled values.
    const width = widthScale(Math.abs(d.value));
    const height = heightScale(Math.abs(d.value));
    const col = colourScale(d.value);

    // Make discs.
    const geo = new CylinderGeometry(width, width, height, 20, 10, false);
    const mat = new MeshLambertMaterial({ color: col, transparent: false });
    const mesh = new Mesh(geo, mat);
    mesh.rotateX(Math.PI / 2);
    mesh.position.set(
      d.position[0],
      d.position[1],
      d.value > 0 ? height / 2 : -height / 2
    );

    grid.add(mesh);
  });

  return grid;
}

export default getDiscs;
