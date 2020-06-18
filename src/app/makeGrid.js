import {
  Color,
  EdgesGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  PlaneBufferGeometry,
  MeshLambertMaterial,
  Mesh,
  DoubleSide,
} from 'three/build/three.module';

import state from '../core/state';

function getGrid(data, { size = 1, colour = 0x00000 } = {}) {
  // The parent grid object.
  const grid = new Group();

  // Build the mesh of a base sqaure.
  const geo = new PlaneBufferGeometry(size, size);

  // Line meshes.
  const edgeGeo = new EdgesGeometry(geo);
  const matLine = new LineBasicMaterial({
    color: new Color(colour),
    transparent: false, // otherwise it'll all go! 😮
  });
  const baseSquareLine = new LineSegments(edgeGeo, matLine);

  const matSquare = new MeshLambertMaterial({
    color: state.colours.gridBase,
    transparent: true,
    opacity: 0.3,
    side: DoubleSide,
  });

  // Build out the grid.
  data.forEach(d => {
    // Square grid.
    const squareLine = baseSquareLine.clone();
    squareLine.userData = d;
    squareLine.position.set(d.position[0], d.position[1], 0);

    // Square meshes.
    const squarePlane = new Mesh(geo, matSquare.clone());
    squarePlane.userData = d;
    squarePlane.position.set(d.position[0], d.position[1], 0);

    grid.add(squareLine, squarePlane);
  });

  return grid;
}

export default getGrid;
