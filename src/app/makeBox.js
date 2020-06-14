import {
  BoxBufferGeometry,
  MeshStandardMaterial,
  MeshLambertMaterial,
  DoubleSide,
  Mesh,
} from 'three/build/three.module';

function getBox() {
  const geo = new BoxBufferGeometry(1000, 1000, 1000);
  const mat = new MeshStandardMaterial({
    color: '#FDEBD0',
    side: DoubleSide,
  });

  const mesh = new Mesh(geo, mat);

  mesh.receiveShadow = true;

  return mesh;
}

export default getBox;
