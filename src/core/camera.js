import { PerspectiveCamera } from 'three/build/three.module';

const fov = 75;
const aspect = 2;
const near = 1;
const far = 1000;
const camera = new PerspectiveCamera(fov, aspect, near, far);

export default camera;
