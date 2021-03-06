import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';
import { TweenLite, TweenMax, gsap } from 'gsap' // https://greensock.com/docs/

import { Store } from '@js/Store'

class Scene {
   constructor(opt) {
      this.canvas = document.querySelector('.webgl')

      this.lowestElapsedTime = 0

      this.init()
      this.postProcessing()
      this.resize()
   }

   init() {
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(75, Store.params.sizes.width / Store.params.sizes.height, .01, 1000)
      this.camera.position.set(0, 0, 3);  
      this.renderer = new THREE.WebGLRenderer({
         canvas: this.canvas,
         powerPreference: 'high-performance',
         antialias: true,
         alpha: true
      })
      this.renderer.setSize(Store.params.sizes.width, Store.params.sizes.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      this.renderer.setClearColor(0x000000, 1)

      this.clock = new THREE.Clock()

      this.scene.add(this.camera)
   }

   postProcessing() {
      this.renderScene = new RenderPass( this.scene, this.camera );

      this.bloomPass = new UnrealBloomPass( new THREE.Vector2(Store.params.sizes.width, Store.params.sizes.height ));
      this.bloomPass.threshold = 0;
      this.bloomPass.strength = .76;
      this.bloomPass.radius = 0;

      this.afterimagePass = new AfterimagePass();
      this.afterimagePass.uniforms.damp.value = Store.params.pp.aip.damp

      this.rgbShift = new ShaderPass( RGBShiftShader )
      this.rgbShift.uniforms.amount.value = Store.params.pp.rgbShift.amount
      
      this.composer = new EffectComposer( this.renderer );
      this.composer.addPass( this.renderScene );
		this.composer.addPass( this.afterimagePass );
      this.composer.addPass( this.rgbShift );
      this.composer.addPass( this.bloomPass );
   }

   vertigoEffect(dir) {
      if (dir == 1) {
         gsap.to(this.camera, 1, { fov: 35, ease: "Power3.easeInOut" })
         gsap.to(this.camera.position, 1, { z: 4.25, ease: "Power3.easeInOut", onUpdate: () => {
            this.camera.updateProjectionMatrix();
         } })
      } else if (dir == 3) {
         gsap.to(this.camera, 1, { fov: 145, ease: "Power3.easeInOut" })
         gsap.to(this.camera.position, 1, { z: 0.1, ease: "Power3.easeInOut", onUpdate: () => {
            this.camera.updateProjectionMatrix();
         } })
      }
   }

   noVertigoEffect() {
      gsap.to(this.camera, 1, { fov: 75, ease: "Power3.easeInOut" })
      gsap.to(this.camera.position, 1, { z: 3, ease: "Power3.easeInOut", onUpdate: () => {
         this.camera.updateProjectionMatrix();
      } })
   }

   resize() {
      window.addEventListener('resize', () => {
         // Update sizes
         Store.params.sizes.width = window.innerWidth
         Store.params.sizes.height = window.innerHeight
     
         // Update camera
         this.camera.aspect = Store.params.sizes.width / Store.params.sizes.height
         this.camera.updateProjectionMatrix()
     
         // Update renderer
         this.renderer.setSize(Store.params.sizes.width, Store.params.sizes.height)
         this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
     })
   }

   update() {
   }
   
   render() {
      this.composer.passes[1].uniforms.damp.value = Store.params.pp.aip.damp + Math.abs(Store.sound.freqDatas.uSoundBass * .03 + Store.sound.freqDatas.uSoundLowAcute * .01)
      this.composer.passes[2].uniforms.amount.value = Store.params.pp.rgbShift.amount + Math.abs(Store.sound.freqDatas.uSoundBass * .0011)

      this.composer.render()
   }
}

const out = new Scene()
export default out