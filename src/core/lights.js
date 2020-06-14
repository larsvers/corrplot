/* eslint-disable import/no-mutable-exports */
import {
  AmbientLight,
  PointLight,
  SpotLight,
  DirectionalLight,
} from 'three/build/three.module';

// Declare lights.
let ambientLight;
let pointLight;
let spotLight;
let directionalLight;

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
{
  const color = 'yellow';
  const intensity = 2;
  spotLight = new SpotLight(color, intensity);
  spotLight.castShadow = true;
}
{
  const color = '#fff';
  const intensity = 1;
  directionalLight = new DirectionalLight(color, intensity);
  directionalLight.castShadow = true;
}

// eslint-disable-next-line import/prefer-default-export
export { ambientLight, pointLight, spotLight, directionalLight };
