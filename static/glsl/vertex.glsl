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
attribute float aTimeOffset;

varying vec2 vUv;
varying vec3 vPos;
varying vec4 vModelViewMatrix;
varying float vProgress;
varying float vLoop;

const float maxDuration = 10.;

void main() {
   vProgress = uProgress;
   vUv = uv;
   vec3 pos = position;
   vec3 torusPos = pos + aPosition;

   vec3 testRdmPos = aRandomPos;

   float progress = mod(uTime + aTimeOffset * maxDuration, maxDuration) / maxDuration;
   vLoop = progress;

   testRdmPos.z += 5. + ((1. - progress)) * (2. + testRdmPos.z) * (1. - abs(cos(uTime * .1 + aTimeOffset * 40. ) - 1.) * .5);

   vec3 rdmPos = pos + testRdmPos;
   vec3 renderPos = mix(torusPos, rdmPos, uProgress);

   vPos = aRandomPos;

   vec4 mv = modelViewMatrix * vec4(renderPos, 1.);

   mv.z += sin(mv.x * 3. + (uTime * 5.)) * .2 * uProgress;
   mv.z += sin(mv.y * 3. + (uTime * 5.)) * .2 * uProgress;
   mv.z += sin(mv.z * 3. + (uFreq * 5.)) * .1 * (1. - uProgress);
   vModelViewMatrix = mv;
   gl_Position = projectionMatrix * mv;
   // gl_PointSize = uSize * 1. / -mv.z; // Pour les THREE.Points
}