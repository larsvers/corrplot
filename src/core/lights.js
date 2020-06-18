/* eslint-disable import/no-mutable-exports */
import { AmbientLight, PointLight } from 'three/build/three.module';

// Declare lights.
let ambientLight;
let pointLight;

// Define lights.
{
  const color = '#fff';
  const intensity = 0.8;
  ambientLight = new AmbientLight(color, intensity);
}
{
  const color = '#fff';
  const intensity = 0.3;
  pointLight = new PointLight(color, intensity);
}

// eslint-disable-next-line import/prefer-default-export
export { ambientLight, pointLight };
