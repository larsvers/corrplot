import dat from 'dat.gui';
import { box } from './init';
import { ambientLight, pointLight } from '../core/lights';

const params = {
  color: '#f7f7f7',
  ambientInt: ambientLight.intensity,
  pointInt: pointLight.intensity,
};

const gui = new dat.GUI();

gui.addColor(params, 'color').onChange(v => box.material.color.set(v));
gui
  .add(params, 'ambientInt', 0, 1, 0.1)
  .onChange(v => (ambientLight.intensity = +v));
gui
  .add(params, 'pointInt', 0, 1, 0.1)
  .onChange(v => (pointLight.intensity = +v));

export default params;
