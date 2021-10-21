/* example */
// #pragma glslify: functionName = require(./function/templateFunction.glsl)

#define PI 3.1415926535897932384626433832795

precision highp float;

uniform float uTime;
uniform float uFreq;
uniform float uSize;
uniform float uProgress;

attribute vec3 aRandomPos;
attribute vec3 aPosition;
// attribute vec3 aTimeOffset;
// attribute vec3 aRandomScale;
attribute vec3 aParams;

varying vec2 vUv;
varying vec3 vPos;
varying vec4 vModelViewMatrix;
varying float vRandomScale;
varying float vProgress;
varying float vLoop;

const float maxDuration = 10.;

void main() {
   vProgress = uProgress;
   vRandomScale = aParams.y;
   vUv = uv;
   vec3 pos = position;
   // vec3 randomPos = aRandomPos;
   vec3 torusPos = pos + aPosition;
   vec3 rdmPos = pos + aRandomPos;

   float progress = mod(uTime + aParams.x * maxDuration, maxDuration) / maxDuration;
   vLoop = progress;

   rdmPos.z -= -25. + ((1. - progress)) * (30. + rdmPos.z) * (1. - abs(cos(uTime * .1 + aParams.x * 70. ) - 1.) * .5);

   torusPos.x -=  abs(.001 + (sin(uTime * 5.) * .00006) * (1. - progress) * (rdmPos.x * aParams.z) * (1. - abs(cos(uTime * aParams.z * .1 + aParams.x ) - 1.) * .1)); // For bass
   torusPos.x +=  abs(.001 + (sin(uTime * 5.) * .00006) * (1. - progress) * (rdmPos.y * aParams.z) * (1. - abs(cos(uTime * aParams.z * .1 + aParams.x ) - 1.) * .1)); // For bass
   torusPos.y -=  abs(.001 + (sin(uTime * 5.) * .00006) * (1. - progress) * (rdmPos.x * aParams.z) * (1. - abs(cos(uTime * aParams.z * .1 + aParams.x ) - 1.) * .1)); // For bass
   torusPos.y +=  abs(.001 + (sin(uTime * 5.) * .00006) * (1. - progress) * (rdmPos.y * aParams.z) * (1. - abs(cos(uTime * aParams.z * .1 + aParams.x ) - 1.) * .1)); // For bass

   rdmPos.x -=  .013 + (sin(uTime * 5.) * .01) * (1. - progress) * (rdmPos.x * aParams.z) * (1. - abs(cos(uTime * .1 + aParams.x * 5. ) - 1.) * .5); // For bass
   rdmPos.y -=  .013 + (sin(uTime * 5.) * .01) * (1. - progress) * (rdmPos.y * aParams.z) * (1. - abs(cos(uTime * .1 + aParams.x * 5. ) - 1.) * .5); // For bass

   vec3 renderPos = mix(torusPos, rdmPos, uProgress);

   vPos = rdmPos;

   vec4 mv = modelViewMatrix * vec4(renderPos, 1.);

   if (uProgress < .1) {
      mv.z += (sin(mv.z + (uTime * 10. + uFreq)) * .1);
   }
   mv.z += sin(mv.x * 3. + (uTime * 5.)) * .2 * uProgress;
   mv.z += sin(mv.y * 3. + (uTime * 5.)) * .2 * uProgress;
   vModelViewMatrix = mv;
   gl_Position = projectionMatrix * mv;
}