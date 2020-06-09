import { WebGLRenderer } from 'three/build/three.module';
import state from './state';

const canvas = document.querySelector('canvas');
const renderer = new WebGLRenderer({ canvas, antialias: true });
renderer.setClearColor(state.colours.background);

export default renderer;
