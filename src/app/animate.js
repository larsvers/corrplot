import { setRendererSize } from './utils';
import renderer from '../core/renderer';
import scene from '../core/scene';
import camera from '../core/camera';
import controls from '../core/controls';

function animate(time) {
  requestAnimationFrame(animate);

  if (setRendererSize(renderer)) {
    const canvas = renderer.domElement;
    camera.left = -canvas.clientWidth / 2;
    camera.right = canvas.clientWidth / 2;
    camera.top = canvas.clientHeight / 2;
    camera.bottom = -canvas.clientHeight / 2;
    camera.updateProjectionMatrix();
  }

  controls.update();
  renderer.render(scene, camera);
}

export default animate;
