import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';

class Scene {
   constructor(opt) {
      this.canvas = opt.canvas
      this.settings = opt.settings

      this.sizes = {
         width: window.innerWidth,
         height: window.innerHeight
      }
      
      this.lowestElapsedTime = 0

      this.init()
      this.postProcessing()
      this.resize()
   }

   init() {
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.01, 1000)
      this.camera.position.set(0, 0, 3);  
      this.renderer = new THREE.WebGLRenderer({
         canvas: this.canvas,
         powerPreference: 'high-performance',
         antialias: true,
         alpha: true
      })
      this.renderer.setSize(this.sizes.width, this.sizes.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      this.renderer.setClearColor(0x000000, 0)

      this.clock = new THREE.Clock()

      this.scene.add(this.camera)
   }

   postProcessing() {
      this.renderScene = new RenderPass( this.scene, this.camera );

      this.bloomPass = new UnrealBloomPass( new THREE.Vector2( this.sizes.width, this.sizes.height ), 1.5, 0.4, 0.85 );
      this.bloomPass.threshold = this.settings.bloomThreshold;
      this.bloomPass.strength = this.settings.bloomStrength;
      this.bloomPass.radius = this.settings.bloomRadius;

      this.afterimagePass = new AfterimagePass();
      this.afterimagePass.uniforms.damp.value = .5

      this.rgbShift = new ShaderPass( RGBShiftShader )
      this.rgbShift.uniforms.amount.value = 0.0015;
      
      this.composer = new EffectComposer( this.renderer );
      this.composer.addPass( this.renderScene );
		this.composer.addPass( this.afterimagePass );
      this.composer.addPass( this.bloomPass );
      this.composer.addPass( this.rgbShift );
   }

   resize() {
      window.addEventListener('resize', () => {
         // Update sizes
         this.sizes.width = window.innerWidth
         this.sizes.height = window.innerHeight
     
         // Update camera
         this.camera.aspect = this.sizes.width / this.sizes.height
         this.camera.updateProjectionMatrix()
     
         // Update renderer
         this.renderer.setSize(this.sizes.width, this.sizes.height)
         this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
     })
   }
}

export default Scene