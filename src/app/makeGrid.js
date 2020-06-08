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

function getGrid(data, { size = 1, colour = 0x00000 } = {}) {
  // The parent grid object.
  const grid = new Group();

  // Build the mesh of a base sqaure.
  const geo = new PlaneBufferGeometry(size, size);

  // Line meshes.
  const matLine = new LineBasicMaterial({ color: new Color(colour) });
  const edgeGeo = new EdgesGeometry(geo);
  const baseSquareLine = new LineSegments(edgeGeo, matLine);

  const matSquare = new MeshLambertMaterial({
    color: '#FEF9E7',
    transparent: true,
    opacity: 0.3,
    side: DoubleSide,
  });

  // Build out the grid.
  data.forEach(d => {
    const squareLine = baseSquareLine.clone();
    squareLine.position.set(d.position[0], d.position[1], 0);

    // Square meshes.
    const squarePlane = new Mesh(geo, matSquare.clone());
    squarePlane.position.set(d.position[0], d.position[1], 0);

    grid.add(squareLine, squarePlane);
  });

  return grid;
}

export default getGrid;
