import {
  CylinderGeometry,
  MeshLambertMaterial,
  Mesh,
  Group,
} from 'three/build/three.module';

function getDiscs(data, { size = 1 } = {}) {
  const grid = new Group();

  // Build out the disc grid.
  data.forEach(d => {
    // Make discs.
    const geo = new CylinderGeometry(size / 2, size / 2, 1, 20);
    const mat = new MeshLambertMaterial({ color: '#777' });
    const mesh = new Mesh(geo, mat);
    mesh.rotateX(Math.PI / 2);
    mesh.position.set(d.position[0], d.position[1], 0);
    grid.add(mesh);
  });

  return grid;
}

export default getDiscs;
