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

  vec3 color = (uColor * (.5 + uProgress)) * (strength * .7);
  color *= smoothstep(.5, 6., color);
  // color += ((2. + (abs((uSoundHighAcute * .6 )* uProgress) + abs(uSoundLowBass * .4) * .2 * uProgress) * (vPos * .2)) * 3.2) * (color * (vPos * .02) * .5) * 1.1;
  color += (((1. * uProgress) + (abs((uSoundMedium * .4 ) * uProgress) * abs(uSoundLowBass * .2) * .5 * uProgress) * vPos * 1.1) * (color * (vPos * .2) * .3) * 1.1);

  float alpha = smoothstep(1., .01, vLoop) * smoothstep(.01, .8, vLoop) * (vPos.z * 5. + (uAlpha * 2.));
  alpha += (uAlpha * (1. + (abs((uSoundMedium + uSoundAcute) * .5))));
  alpha -= .5 * (abs(.1 - uProgress) * (vRandomScale * .6));

  gl_FragColor = vec4(color, alpha);
}