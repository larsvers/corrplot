/* eslint-disable import/no-duplicates */
import { setRendererSize } from './utils';
import { updateTweenZoom } from '../interact/handler';
import renderer from '../core/renderer';
import scene from '../core/scene';
import camera from '../core/camera';
import controls from '../core/controls';
import state from '../core/state';

// prettier-ignore
import { getCameraParams } from '../core/camera'

import params from './datGui';

function animate(time) {
  requestAnimationFrame(animate);

  // Responsive camera.
  if (setRendererSize(renderer)) {
    const canvas = renderer.domElement;
    const c = getCameraParams(canvas.width / canvas.height);
    camera.left = c.left;
    camera.right = c.right;
    camera.top = c.top;
    camera.bottom = c.bottom;
    camera.updateProjectionMatrix();

    // Get screensize and update dependent funcs (just one so far).
    state.screen = canvas.width < 800 ? 'mobile' : 'desktop';
    updateTweenZoom();
  }

  // Update controls and render.
  controls.update();
  renderer.render(scene, camera);
}

export default animate;
