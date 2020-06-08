import {
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'three/build/three.module';

// Highlighting light bulb.
// Note the light is being mad in `lights.js`.
const geoBulb = new SphereGeometry(1, 50, 50);
const matBulb = new MeshBasicMaterial({ color: '#fff' });
const bulb = new Mesh(geoBulb, matBulb);

export { bulb };
