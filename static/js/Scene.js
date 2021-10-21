import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';

import { Store } from './Store'

class Scene {
   constructor(opt) {
      this.canvas = opt.canvas
      this.settings = opt.settings

      this.lowestElapsedTime = 0

      this.init()
      this.postProcessing()
      this.resize()
   }

   init() {
      this.scene = new THREE.Scene()
      // this.camera = new THREE.PerspectiveCamera(75, Store.params.sizes.width / Store.params.sizes.height, 1.2, 1000)
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
      this.afterimagePass.uniforms.damp.value = .80

      this.rgbShift = new ShaderPass( RGBShiftShader )
      this.rgbShift.uniforms.amount.value = 0.0011;
      
      this.composer = new EffectComposer( this.renderer );
      this.composer.addPass( this.renderScene );
		this.composer.addPass( this.afterimagePass );
      this.composer.addPass( this.bloomPass );
      this.composer.addPass( this.rgbShift );
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
}

export default Scene