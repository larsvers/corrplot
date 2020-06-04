import { OrthographicCamera } from 'three/build/three.module';
import renderer from './renderer';

const near = 1;
const far = 1000;

const canvas = renderer.domElement;
const camera = new OrthographicCamera(
  -canvas.clientWidth / 2,
  canvas.clientWidth / 2,
  canvas.clientHeight / 2,
  -canvas.clientHeight / 2,
  near,
  far
);

export default camera;
