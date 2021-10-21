#define PI 3.1415926535897932384626433832795

precision highp float;

uniform float uTime;
uniform float uAlpha;
uniform float uUpAlpha;
uniform float uProgress;
uniform vec3 uColor;

varying vec2 vUv;
varying vec3 vPos;
varying vec4 vModelViewMatrix;
varying float vRandomScale;
varying float vLoop;

void main() {
  float strength = (1.1 / (distance(vUv, vec2(.5)))); // forme de la particule

  if (uProgress > .3) {
    strength *= vRandomScale;
  }

  vec3 color = uColor * ((strength * .2) + (2. * uProgress));
  color *= smoothstep(.5, 8., color);

  float alpha = -smoothstep(1., .8, vLoop) * (vModelViewMatrix.z * 2. + uAlpha);
  alpha *= (uAlpha * uUpAlpha) * (strength * .5) * vLoop;

  alpha *= abs(.5 - uProgress) * vRandomScale;

  gl_FragColor = vec4(color + ((1. +(uUpAlpha * .2) * (vPos * .2)) * 2.2) * (color * (vPos * .02) * .5) * 1.1, alpha);
}