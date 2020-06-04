import {
  Color,
  EdgesGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  PlaneBufferGeometry,
} from 'three/build/three.module';

function getGrid(data, { size = 1, colour = 0x00000 } = {}) {
  // The parent grid object.
  const grid = new Group();

  // Build the mesh of a base sqaure.
  const geo = new PlaneBufferGeometry(size, size);
  const mat = new LineBasicMaterial({ color: new Color(colour) });
  const edgeGeo = new EdgesGeometry(geo);
  const baseSquare = new LineSegments(edgeGeo, mat);

  // Build out the grid.
  data.forEach(d => {
    const square = baseSquare.clone();
    square.position.set(d.position[0], d.position[1], 0);
    grid.add(square);
  });

  return grid;
}

export default getGrid;
