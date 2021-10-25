/* example */
// #pragma glslify: functionName = require(./function/templateFunction.glsl)

#define PI 3.1415926535897932384626433832795

precision highp float;

uniform float uTime;
uniform float uProgress;

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


attribute vec3 aTorusPositions;
attribute vec3 aVortexPositions;
attribute vec3 aParams;

varying vec2 vUv;
varying vec3 vPos;
varying vec4 vModelViewMatrix;
varying float vRandomScale;
varying float vLoop;

const float maxDuration = 7.5;

void main() {
   vRandomScale = aParams.y;
   vUv = uv;
   vec3 pos = position;
   // vec3 randomPos = aRandomPos;
   vec3 torusPos = pos + aTorusPositions;
   vec3 vortexPos = pos + aVortexPositions;

   float loop = mod(uTime + aParams.x * maxDuration, maxDuration) / maxDuration;
   vLoop = loop;

   // vortexPos.z -= -25. + ((1. - loop)) * (3000. + vortexPos.z) * (1. - abs(cos(uTime + aParams.x * 70. ) - 1.) * .5); // chaotic mode
   vortexPos.z -= -25. + ((1. - loop)) * (30. + vortexPos.z) * (1. - abs(cos(uTime * .1 + aParams.x * 70.) - 1.) * .5);
   vortexPos.x -=  .013 + (sin(uTime * 5.) * .01) * (1. - loop) * (vortexPos.x * aParams.z * 1.2) * (1. - abs(((aParams.x * .06) * (uSoundLowBass * .2)) - 1.) * .5) * (vortexPos.z * .5 * (uSoundLowBass * .02)); // For bass
   vortexPos.y -=  .013 + (sin(uTime * 5.) * .01) * (1. - loop) * (vortexPos.y * aParams.z * 1.2) * (1. - abs(((aParams.x * .06) * (uSoundLowBass * .2)) - 1.) * .5) * (vortexPos.z * .5 * (uSoundLowBass * .02)); // For bass

   torusPos.x -=  abs(.001 + (sin(uTime * 5.) * .00006) * (1. - loop) * (vortexPos.x * aParams.z) * (1. - abs(cos(uTime * aParams.z * .1 + aParams.x ) - 1.) * .1)) * ((uSoundLowBass + uSoundBass + uSoundHighBass + uSoundMedium + uSoundAcute) * .35); // For bass
   torusPos.x +=  abs(.001 + (sin(uTime * 5.) * .00006) * (1. - loop) * (vortexPos.y * aParams.z) * (1. - abs(cos(uTime * aParams.z * .1 + aParams.x ) - 1.) * .1)) * ((uSoundLowBass + uSoundBass + uSoundHighBass + uSoundMedium + uSoundAcute) * .35); // For bass
   torusPos.y -=  abs(.001 + (sin(uTime * 5.) * .00006) * (1. - loop) * (vortexPos.x * aParams.z) * (1. - abs(cos(uTime * aParams.z * .1 + aParams.x ) - 1.) * .1)) * ((uSoundLowBass + uSoundBass + uSoundHighBass + uSoundMedium + uSoundAcute) * .35); // For bass
   torusPos.y +=  abs(.001 + (sin(uTime * 5.) * .00006) * (1. - loop) * (vortexPos.y * aParams.z) * (1. - abs(cos(uTime * aParams.z * .1 + aParams.x ) - 1.) * .1)) * ((uSoundLowBass + uSoundBass + uSoundHighBass + uSoundMedium + uSoundAcute) * .35); // For bass

   vec3 renderPos = mix(torusPos, vortexPos, uProgress);

   vPos = vortexPos;

   vec4 mv = modelViewMatrix * vec4(renderPos, 1.);

   if (uProgress < .1) {
      mv.z += (sin(mv.z + (uTime * 10. + uSoundMedium)) * .1) * abs(uSoundLowBass * 1.2);
   }
   mv.z += sin(mv.x * 3. + (uTime * 5.)) * .2 * uProgress;
   mv.z += sin(-mv.x * 3. + (uTime * 5.)) * .2 * uProgress;
   mv.z += sin(mv.y * 3. + (uTime * 5.)) * .2 * uProgress;
   mv.z += sin(-mv.y * 3. + (uTime * 5.)) * .2 * uProgress;
   vModelViewMatrix = mv;
   gl_Position = projectionMatrix * mv;
}