import * as THREE from 'three'
import gsap from 'gsap'
import { BufferGeometry, Group, Mesh, PlaneBufferGeometry, TorusBufferGeometry } from 'three'
import vertex from '../glsl/vortex/vertex.glsl'
import fragment from '../glsl/vortex/fragment.glsl'
import { Store } from './Store'

class Torus {
   constructor(opt) {
      this.scene = opt.scene

      this.init()
      this.resize()
   }
   
   init() { //Instanced Buffer Geo version
      const torusGeometry = new TorusBufferGeometry( .4, .02, 30, 200    );
      // const torusGeometry = new PlaneBufferGeometry( 1, 1, 32, 32 );
      const particlesCount = torusGeometry.attributes.position.array

      this.blueprintParticle = new PlaneBufferGeometry()
      this.blueprintParticle.scale(.1, .1, .1)
      // this.blueprintParticle.rotateY(Math.PI)

      this.geometry = new THREE.InstancedBufferGeometry()
      
      this.geometry.index = this.blueprintParticle.index
      this.geometry.attributes.position = this.blueprintParticle.attributes.position
      this.geometry.attributes.normal = this.blueprintParticle.attributes.normal
      this.geometry.attributes.uv = this.blueprintParticle.attributes.uv

      this.positions = new Float32Array(particlesCount.length)
      this.randomPositions = new Float32Array(particlesCount.length)
      this.params = new Float32Array(particlesCount.length)
      
      for (let i = 0; i < particlesCount.length; i = i + 3) {
         this.positions[i + 0] = particlesCount[i + 0]
         this.positions[i + 1] = particlesCount[i + 1]
         this.positions[i + 2] = particlesCount[i + 2]

         // Vortex
         const radius = Math.random() * 30
         const spinAngle = radius * 2
         const branchAngle = (i % 5) / 5 * (Math.PI * 2)

         const randomX = Math.cos(branchAngle + spinAngle) * radius + Math.pow(Math.random(), 3) * (Math.random())
         const randomY = Math.sin(branchAngle + spinAngle) * radius + Math.pow(Math.random(), 3) * (Math.random())
         const randomZ = -50 + (Math.sqrt((randomX * randomX) + (randomY * randomY) - .5) * 6)

         this.randomPositions[i + 0] = randomX
         this.randomPositions[i + 1] = randomY
         this.randomPositions[i + 2] = randomZ

         this.params[i + 0] = THREE.MathUtils.randFloatSpread(50)
         this.params[i + 1] = THREE.MathUtils.randFloat(.7, 1.3)
         this.params[i + 2] = spinAngle
      }

      console.log(this.params);
      
      this.material = new THREE.ShaderMaterial({
         vertexShader: vertex,
         fragmentShader: fragment,
         uniforms: {
            uTime: { value : 0 },
            uColor: { value: new THREE.Color(0xffffff) },
            uAlpha: { value: .01 },
            uFreq: { value: 0.5 },
            uSize: { value: 5 },
            uProgress: { value: 0 },
            uAspect : { value : new THREE.Vector2(Store.params.sizes.width, Store.params.sizes.height) },
            uPixelRatio: { value: window.devicePixelRatio }
         },
         side: THREE.DoubleSide,
         transparent: true,
         // wireframe: true,

         /* pour les particules */
         depthTest: false,
         depthWrite: false,
         blending: THREE.AdditiveBlending
      })

      // this.geometry = new BufferGeometry()

      this.geometry.setAttribute( 'aPosition', new THREE.InstancedBufferAttribute( this.positions, 3, false ) );
      this.geometry.setAttribute( 'aRandomPos', new THREE.InstancedBufferAttribute( this.randomPositions, 3, false ) );
      this.geometry.setAttribute( 'aParams', new THREE.InstancedBufferAttribute( this.params, 3, false ) )
      // this.geometry.setAttribute( 'aRandomScale', new THREE.InstancedBufferAttribute( this.randomScale, 3, false ) )

      this.torusMesh = new Mesh(this.geometry, this.material)
      this.torusMesh.rotation.y = Math.PI
      this.torusMesh.frustumCulled = false

      this.particlesGroup = new THREE.Group()
      this.particlesGroup.add(this.torusMesh)

      this.scene.scene.add(this.torusMesh)

      this.start()
   }


   start() {
      gsap.from(this.torusMesh.position, 4, { y: -5, ease: "Power3.easeInOut" })
      gsap.from(this.torusMesh.rotation, 2, { y: -.5 * (Math.PI * 2), ease: "Power3.easeOut", delay: 2})
      // this.fakeAudioScale()
   }
   
   expand(bool) {
      if (bool) {
         gsap.to(this.torusMesh.scale, .5, { x: 0, y: 0, z: 0, ease: "Expo.easeInOut"})
         // gsap.to(this.torusMesh.rotation, 0, { y: .5 * (Math.PI * 2), ease: "Power3.easeOut", delay: .5})
         gsap.to(this.torusMesh.scale, .3, { x: 1, y: 1, z: 1, ease: "Expo.easeInOut", delay: .5})
         gsap.to(this.torusMesh.material.uniforms.uProgress, 1.1, { value: .75, ease: "Expo.easeInOut", delay: .4})
         gsap.to(this.torusMesh.material.uniforms.uAlpha, 1.1, { value: .75, ease: "Expo.easeInOut", delay: .4})
      } else {
         gsap.to(this.torusMesh.material.uniforms.uProgress, 2, { value: 0, ease: "Expo.easeOut"})
         gsap.to(this.torusMesh.material.uniforms.uAlpha, 1.1, { value: .01, ease: "Expo.easeInOut", delay: .4})
         // gsap.from(this.torusMesh.rotation, 1, { y: .5 * (Math.PI * 2), ease: "Power3.easeOut", delay: 1})
      }
   }

   fakeAudioScale() {
      const rdmScale = Math.random() * 2
      gsap.to(this.torusMesh.scale, .5, { x: rdmScale, y: rdmScale, z: rdmScale, ease: "Power3.easeInOut", yoyo: true, repeat: -1})
   }

   resize() {
      window.addEventListener('resize', () => {
         this.material.uniforms.uAspect.value = new THREE.Vector2(Store.params.sizes.width, Store.params.sizes.height)
         this.material.uniforms.uPixelRatio.value = window.devicePixelRatio
     })
   }

   update(time) {
      this.torusMesh.rotation.z = time * - Math.PI * .1
      // this.torusMesh.position.z = time
      // this.torusMesh.rotation.y = time * - Math.PI * .2
      // this.torusMesh.rotation.x = time * - Math.PI * .2
      const rdmScale = 5 + Math.random()
      // gsap.to(this.torusMesh.material.uniforms.uFreq, .1, { value: rdmScale, ease: "Power3.easeInOut"})
      this.torusMesh.material.uniforms.uFreq.value = rdmScale


      this.torusMesh.material.uniforms.uTime.value = time
   }
}

export default Torus