#define PI 3.1415926535897932384626433832795

precision highp float;

uniform float uTime;
uniform float uAlpha;
uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv;
varying vec3 vPos;

void main() {
  vec4 texture = texture2D(uTexture, vUv);

  // gl_FragColor = vec4(uColor, uAlpha);
  gl_FragColor = texture;
}