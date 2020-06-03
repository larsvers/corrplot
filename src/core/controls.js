import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

import camera from './camera';
import renderer from './renderer';

const controls = new TrackballControls(camera, renderer.domElement);

export default controls;
