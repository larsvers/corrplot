import dat from 'dat.gui';
import { box } from './init';
import { ambientLight, pointLight, directionalLight } from '../core/lights';

const params = {
  color: '#fdebd0',
  pointIntensity: 0.3,
  ambientIntensity: 0.8,
  dirIntensity: 0.8,
  shadowR: 8,
};

const gui = new dat.GUI();
gui.addColor(params, 'color').onChange(v => box.material.color.set(v));
gui
  .add(params, 'ambientIntensity', 0, 1, 0.1)
  .onChange(v => (ambientLight.intensity = +v));
gui
  .add(params, 'pointIntensity', 0, 1, 0.1)
  .onChange(v => (pointLight.intensity = +v));
gui
  .add(params, 'dirIntensity', 0, 1, 0.1)
  .onChange(v => (directionalLight.intensity = +v));
gui
  .add(params, 'shadowR', 0, 100)
  .onChange(v => (directionalLight.shadow.radius = +v));

export default params;
