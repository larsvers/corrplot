import {
  BoxBufferGeometry,
  MeshStandardMaterial,
  MeshLambertMaterial,
  DoubleSide,
  Mesh,
} from 'three/build/three.module';

function getBox() {
  const geo = new BoxBufferGeometry(10000, 10000, 10000);
  const mat = new MeshStandardMaterial({
    color: '#f7f7f7',
    side: DoubleSide,
  });

  const mesh = new Mesh(geo, mat);

  return mesh;
}

export default getBox;
