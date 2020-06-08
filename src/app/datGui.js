import dat from 'dat.gui';

const params = {
  x: 0,
  y: 0,
  z: 0,
  intensity: 1,
  distance: 1,
  decay: 1,
};

const gui = new dat.GUI();
gui.add(params, 'x', -100, 100);
gui.add(params, 'y', -100, 100);
gui.add(params, 'z', -100, 100);
gui.add(params, 'intensity', 0, 10, 0.1);
gui.add(params, 'distance', 0, 100, 1);
gui.add(params, 'decay', 0, 10, 0.1);

export default params;
