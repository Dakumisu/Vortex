import * as THREE from 'three'
import gsap from 'gsap'
import vertex from '../glsl/button/vertex.glsl'
import fragment from '../glsl/button/fragment.glsl'
import { Store } from './Store'
import { Group, Mesh, PlaneBufferGeometry, ShaderMaterial, TextureLoader, Vector2 } from 'three'

class PlaneButton {
   constructor(opt) {
      this.scene = opt.scene
      this.mouse = opt.mouse
      this.name = opt.name
      this.image = opt.image

      this.target = new Vector2(0, 0)

      this.init()
      this.resize()
   }
   
   init() {
      this.plane = {}

      const loader = new TextureLoader()

      this.texture = loader.load( this.image )
      this.plane.geometry = new PlaneBufferGeometry(1, .3, 1, 1)

      this.plane.material = new ShaderMaterial({
         vertexShader: vertex,
         fragmentShader: fragment,
         uniforms: {
            uTime: { value : 0 },
            uTexture: { value: this.texture },
            uColor: { value: new THREE.Color(0xffffff) },
            uAlpha: { value: 1 },
            uAspect : { value : new THREE.Vector2(Store.params.sizes.width, Store.params.sizes.height) },
            uPixelRatio: { value: window.devicePixelRatio },
         },
         side: THREE.DoubleSide,
         transparent: true
      })

      this.plane.mesh = new Mesh(this.plane.geometry, this.plane.material)
      this.plane.mesh.frustumCulled = false
      this.plane.mesh.name = this.name

      this.plane.group = new Group
      this.plane.group.add(this.plane.mesh)

      this.scene.scene.add(this.plane.group)

      this.start()
   }

   start() {
      Store.params.experienceStarted = true
   }

   resize() {
      window.addEventListener('resize', () => {
         this.plane.material.uniforms.uAspect.value = new Vector2(Store.params.sizes.width, Store.params.sizes.height)
         this.plane.material.uniforms.uPixelRatio.value = window.devicePixelRatio
     })
   }

   update(et) {

      if (!Store.mobile.isOnMobile) {
         if(!isNaN(this.mouse.x * 0.)) {
            this.target.x = -this.mouse.x * 0.1;
            this.target.y = this.mouse.y * 0.1;
         }
   
         this.plane.group.rotation.y += (.02 * (this.target.x / 2 - this.plane.group.rotation.y));
         this.plane.group.rotation.x += (.02 * (this.target.y / 2 - this.plane.group.rotation.x));
      }
   }
}

export default PlaneButton