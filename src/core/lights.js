/* eslint-disable import/no-mutable-exports */
import { AmbientLight, PointLight } from 'three/build/three.module';

// Declare lights.
let pointLight;
let pointLightFocus;
let ambientLight;

// Define lights.
{
  const color = '#fff';
  const intensity = 0.8;
  ambientLight = new AmbientLight(color, intensity);
}
{
  const color = '#fff';
  const intensity = 0.5;
  pointLight = new PointLight(color, intensity);
}
{
  const color = 'yellow';
  const intensity = 2;
  const decay = 1;
  pointLightFocus = new PointLight(color, intensity);
}

// eslint-disable-next-line import/prefer-default-export
export { ambientLight, pointLight, pointLightFocus };
