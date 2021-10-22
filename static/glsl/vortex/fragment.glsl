#define PI 3.1415926535897932384626433832795

precision highp float;

uniform float uTime;
uniform float uAlpha;
uniform float uProgress;
uniform vec3 uColor;

// Sound
uniform float uSoundLowBass;
uniform float uSoundBass;
uniform float uSoundHighBass;
uniform float uSoundLowMedium;
uniform float uSoundMedium;
uniform float uSoundHighMedium;
uniform float uSoundLowAcute;
uniform float uSoundAcute;
uniform float uSoundHighAcute;

varying vec2 vUv;
varying vec3 vPos;
varying vec4 vModelViewMatrix;
varying float vRandomScale;
varying float vLoop;

void main() {
  float strength = (.8 / (distance(vUv, vec2(.5)))); // forme de la particule

  if (uProgress > .3) {
    strength *= vRandomScale;
  }

  vec3 color = (uColor * (.5 + uProgress)) * (strength * .5);
  color *= smoothstep(.5, 8., color);
  color += ((2. + (abs((uSoundHighAcute * .6 )* uProgress) + abs(uSoundLowBass * 1.4) * .2 * uProgress) * (vPos * .2)) * 3.2) * (color * (vPos * .02) * .5) * 1.1;

  float alpha = smoothstep(1., .9, vLoop) * smoothstep(.9, 1., vLoop) * (vPos.z * 2. + uAlpha);
  alpha *= (uAlpha * abs(uSoundHighAcute)) * (strength * .5) * vLoop;
  alpha *= abs(.5 - uProgress) * vRandomScale;

  gl_FragColor = vec4(color, alpha + 1.);
}