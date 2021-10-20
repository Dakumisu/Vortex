/* example */
// #pragma glslify: functionName = require(./function/templateFunction.glsl)

#define PI 3.1415926535897932384626433832795

precision highp float;

uniform float uTime;

varying vec2 vUv;
varying vec3 vPos;
varying vec4 vModelViewMatrix;

void main() {
   vUv = uv;
   vec3 pos = position;
   vPos = pos;


   vec4 mv = modelViewMatrix * vec4(pos, 1.);
   vModelViewMatrix = mv;

   gl_Position = projectionMatrix * mv;
}