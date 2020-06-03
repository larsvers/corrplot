/* eslint-disable import/no-mutable-exports */
import { AmbientLight, PointLight } from 'three/build/three.module';

// Declare lights.
let pointLight;
let ambientLight;

// Define lights.
{
  const color = '#fff';
  const intensity = 1;
  ambientLight = new AmbientLight(color, intensity);
}
{
  const color = '#fff';
  const intensity = 0.7;
  pointLight = new PointLight(color, intensity);
}

// eslint-disable-next-line import/prefer-default-export
export { ambientLight, pointLight };
