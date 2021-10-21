#define PI 3.1415926535897932384626433832795

precision highp float;

uniform float uTime;
uniform float uAlpha;
uniform vec3 uColor;

varying vec2 vUv;
varying vec3 vPos;
varying vec4 vModelViewMatrix;
varying float vRandomScale;
varying float vProgress;
varying float vLoop;

void main() {
  float strength = (1.1 / (distance(vUv, vec2(.5)))); // forme de la particule

  if (vProgress > .3) {
    strength *= vRandomScale;
  }

  vec3 color = uColor * ((strength * .2) + (2. * vProgress));
  color *= smoothstep(.5, 8., color);

  float alpha = -smoothstep(1., .8, vLoop) * (vModelViewMatrix.z * 2. + uAlpha);
  alpha *= uAlpha * (strength * .5) * vLoop;

  // if (vProgress > .5) {
    alpha *= abs(.5 - vProgress) * vRandomScale;
  // }

  gl_FragColor = vec4(color + (color * (vPos * .02) * .5), alpha);
}