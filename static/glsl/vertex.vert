/* example */
// #pragma glslify: functionName = require(./function/templateFunction.glsl)

#define PI 3.1415926535897932384626433832795

uniform float uTime;
uniform float uFreq;
uniform float uSize;
uniform float uProgress;

attribute vec3 aRandomPos;

varying vec2 vUv;
varying vec3 vPos;

void main() {
   vUv = uv;
   vPos = position;
   vec3 pos = position;

   vec3 renderPos = mix(pos, aRandomPos, uProgress);

   vec4 mv = modelViewMatrix * vec4(renderPos, 1.);
   // mv.z += sin(mv.x * 3. + (uTime * 5.)) * .2 * uFreq;
   // mv.z += sin(mv.y * 3. + (uTime * 5.)) * .2 * uFreq;
   // mv.z += sin(mv.z * 3. + (uTime * 5.)) * .2 * uFreq;

   gl_Position = projectionMatrix * mv;
   gl_PointSize = uSize * 1. / -mv.z; // Pour les THREE.Points
}