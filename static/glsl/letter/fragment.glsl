#define PI 3.1415926535897932384626433832795

precision highp float;

uniform float uTime;
uniform float uAlpha;
uniform vec3 uColor;

varying vec2 vUv;
varying vec3 vPos;
varying vec4 vModelViewMatrix;

void main() {
  
  gl_FragColor = vec4(uColor.yy + (vUv * uColor.xy) * .2, 1., uAlpha);
}