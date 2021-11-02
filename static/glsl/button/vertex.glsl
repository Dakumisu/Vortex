/* example */
// #pragma glslify: functionName = require(./function/templateFunction.glsl)

#define PI 3.1415926535897932384626433832795

precision highp float;

uniform float uTime;

varying vec2 vUv;
varying vec3 vPos;


void main() {
   vUv = uv;
   vec3 pos = position;
   vPos = pos;

   vec4 mv = modelViewMatrix * vec4(pos, 1.);

   // if (uProgress < .1) {
   //    mv.z += (sin(mv.z + (uTime * 10. + uSoundMedium)) * .1) * abs(uSoundLowBass * 1.2);
   // }
   // mv.z += sin(mv.x * 3. + (uTime * 5.)) * .2 * uProgress;
   // mv.z += sin(-mv.x * 3. + (uTime * 5.)) * .2 * uProgress;
   // mv.z += sin(mv.y * 3. + (uTime * 5.)) * .2 * uProgress;
   // mv.z += sin(-mv.y * 3. + (uTime * 5.)) * .2 * uProgress;
   gl_Position = projectionMatrix * mv;
}