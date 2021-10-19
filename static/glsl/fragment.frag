#define PI 3.1415926535897932384626433832795

uniform float uTime;
uniform float uAlpha;
uniform vec3 uColor;

varying vec2 vUv;
varying vec3 vPos;

void main() {
  vec3 color = vec3(uColor);

  gl_FragColor = vec4(mix(color, vec3(vUv, 1.), 0.), uAlpha);
}