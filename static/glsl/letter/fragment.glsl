#define PI 3.1415926535897932384626433832795

precision highp float;

uniform float uTime;
uniform float uAlpha;
uniform float uProgress;
uniform vec3 uColor;

varying vec2 vUv;
varying vec3 vPos;
varying vec4 vModelViewMatrix;

void main() {

  vec3 color = mix(uColor, vec3(uColor.yy + (vUv * uColor.xy) * .2, 1.), uProgress);
  
  gl_FragColor = vec4(uColor.yy + (vUv * uColor.xy) * .2, 1., uAlpha);
  gl_FragColor = vec4(uColor, uAlpha);
  gl_FragColor = vec4(color, uAlpha);
}