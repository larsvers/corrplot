import { OrthographicCamera } from 'three/build/three.module';
import renderer from './renderer';

function getCameraParams(aspect) {
  const viewSize = 300;
  return {
    left: -(aspect * viewSize) / 2,
    right: (aspect * viewSize) / 2,
    top: viewSize / 2,
    bottom: -viewSize / 2,
    near: 0,
    far: 1000,
  };
}

const canvas = renderer.domElement;
const aspect = canvas.width / canvas.height;
const c = getCameraParams(aspect);

const camera = new OrthographicCamera(
  c.left,
  c.right,
  c.top,
  c.bottom,
  c.near,
  c.far
);

export default camera;
export { getCameraParams };
