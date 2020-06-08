import { WebGLRenderer } from 'three/build/three.module';

const canvas = document.querySelector('canvas');
const renderer = new WebGLRenderer({ canvas, antialias: true });
// renderer.setClearColor('#f7f7f7');
renderer.setClearColor('#131D36');

export default renderer;
