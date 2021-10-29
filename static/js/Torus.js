import * as THREE from 'three'
import gsap from 'gsap'
import { BufferGeometry, Group, InstancedBufferAttribute, InstancedBufferGeometry, MathUtils, Mesh, PlaneBufferGeometry, ShaderMaterial, SphereBufferGeometry, TorusBufferGeometry, Vector2 } from 'three'
import vertex from '../glsl/vortex/vertex.glsl'
import fragment from '../glsl/vortex/fragment.glsl'
import { Store } from './Store'

class Torus {
   constructor(opt) {
      this.scene = opt.scene
      this.mouse = opt.mouse

      this.target = new Vector2(0, 0)

      this.torusAlpha = .01
      this.vortexAlpha = .75

      this.setVarations()
      this.init()
      this.resize()
   }
   
   init() { //Instanced Buffer Geo version
      const torusGeometry = new TorusBufferGeometry( .4, .01, 30, 250);
      const particlesCount = torusGeometry.attributes.position.array

      this.blueprintParticle = new PlaneBufferGeometry()
      this.blueprintParticle.scale(.1, .1, .1)

      this.geometry = new InstancedBufferGeometry()
      
      this.geometry.index = this.blueprintParticle.index
      this.geometry.attributes.position = this.blueprintParticle.attributes.position
      this.geometry.attributes.normal = this.blueprintParticle.attributes.normal
      this.geometry.attributes.uv = this.blueprintParticle.attributes.uv

      this.torusPositions = new Float32Array(particlesCount.length)
      this.vortexPositions = new Float32Array(particlesCount.length)
      this.params = new Float32Array(particlesCount.length)
      
      for (let i = 0; i < particlesCount.length; i = i + 3) {
         this.torusPositions[i + 0] = particlesCount[i + 0]
         this.torusPositions[i + 1] = particlesCount[i + 1]
         this.torusPositions[i + 2] = particlesCount[i + 2]

         // Vortex
         const radius = Math.random() * 30
         const spinAngle = radius * 2
         const branchAngle = (i % 5) / 5 * (Math.PI * 2)

         const randomX = Math.cos(branchAngle + spinAngle) * radius + Math.pow(Math.random(), 3) * (Math.random())
         const randomY = Math.sin(branchAngle + spinAngle) * radius + Math.pow(Math.random(), 3) * (Math.random())
         const randomZ = -45 + (Math.sqrt((randomX * randomX) + (randomY * randomY) - .5) * 6)

         this.vortexPositions[i + 0] = randomX
         this.vortexPositions[i + 1] = randomY
         this.vortexPositions[i + 2] = randomZ

         this.params[i + 0] = MathUtils.randFloatSpread(50) // Offset
         this.params[i + 1] = MathUtils.randFloat(.7, 1.3) // Random Scale
         this.params[i + 2] = spinAngle // Angle
      }
      
      this.material = new ShaderMaterial({
         vertexShader: vertex,
         fragmentShader: fragment,
         uniforms: {
            uTime: { value : 0 },
            uColor: { value: new THREE.Color(0xffffff) },
            uAlpha: { value: this.torusAlpha },
            uProgress: { value: 0 },
            uAspect : { value : new THREE.Vector2(Store.params.sizes.width, Store.params.sizes.height) },
            uPixelRatio: { value: window.devicePixelRatio },

            // Sound
            uSoundLowBass: { value: Store.sound.freqDatas.lowBass },
            uSoundBass: { value: Store.sound.freqDatas.bass },
            uSoundHighBass: { value: Store.sound.freqDatas.highBass },
            uSoundLowMedium: { value: Store.sound.freqDatas.lowMedium },
            uSoundMedium: { value: Store.sound.freqDatas.medium },
            uSoundHighMedium: { value: Store.sound.freqDatas.highMedium },
            uSoundLowAcute: { value: Store.sound.freqDatas.lowAcute },
            uSoundAcute: { value: Store.sound.freqDatas.acute },
            uSoundHighAcute: { value: Store.sound.freqDatas.highAcute }

         },
         side: THREE.DoubleSide,
         transparent: true,

         /* pour les particules */
         depthTest: false,
         depthWrite: false,
         blending: THREE.AdditiveBlending
      })

      this.geometry.setAttribute( 'aTorusPositions', new InstancedBufferAttribute( this.torusPositions, 3, false ) );
      this.geometry.setAttribute( 'aVortexPositions', new InstancedBufferAttribute( this.vortexPositions, 3, false ) );
      this.geometry.setAttribute( 'aParams', new InstancedBufferAttribute( this.params, 3, false ) )

      this.torusMesh = new Mesh(this.geometry, this.material)
      this.torusMesh.rotation.y = Math.PI
      this.torusMesh.position.y = -5
      this.torusMesh.frustumCulled = false

      this.particlesGroup = new Group()
      this.particlesGroup.add(this.torusMesh)
      this.scene.scene.add(this.particlesGroup)

      this.start()
   }


   start() {
      gsap.to(this.torusMesh.position, 4, { y: 0, ease: "Power3.easeInOut" })
      gsap.to(this.torusMesh.rotation, 2, { y: -.5 * (Math.PI * 2), ease: "Power3.easeOut", delay: 2 })
   }
   
   expand(bool) {
      if (bool) {
         gsap.to(this.torusMesh.scale, .5, { x: 0, y: 0, z: 0, ease: "Expo.easeInOut"})
         gsap.to(this.torusMesh.scale, .3, { x: 1, y: 1, z: 1, ease: "Expo.easeInOut", delay: .5})
         gsap.to(this.torusMesh.material.uniforms.uProgress, 1.1, { value: .75, ease: "Expo.easeInOut", delay: .4})
         gsap.to(this.torusMesh.material.uniforms.uAlpha, 1.1, { value: this.vortexAlpha, ease: "Expo.easeInOut", delay: .4})
         gsap.to(this.particlesGroup.rotation, 1, { z: this.particlesGroup.rotation.z + (2 * Math.PI) * .2, ease: "Expo.easeInOut", delay: .2 })
      } else {
         gsap.to(this.torusMesh.material.uniforms.uProgress, 1.5, { value: 0, ease: "Expo.easeOut"})
         gsap.to(this.torusMesh.material.uniforms.uAlpha, 1, { value: this.torusAlpha, ease: "Expo.easeInOut", delay: .4})
         gsap.to(this.particlesGroup.rotation, 1.2, { z: this.particlesGroup.rotation.z + (2 * Math.PI) * .2, ease: "Power3.easeOut" })
      }
   }

   setVarations() {
      this.variations = {}

      this.variations.volume = {}
      this.variations.volume.target = 0
      this.variations.volume.current = 0
      this.variations.volume.upEasing = 1.2
      this.variations.volume.downEasing = .7
   }

   resize() {
      window.addEventListener('resize', () => {
         this.material.uniforms.uAspect.value = new Vector2(Store.params.sizes.width, Store.params.sizes.height)
         this.material.uniforms.uPixelRatio.value = window.devicePixelRatio
     })
   }

   update(et) {
      this.torusMesh.rotation.z = (et * .2) * - Math.PI
      this.particlesGroup.rotation.z += -Math.abs(((Store.sound.freqDatas.uSoundHighBass * .5) + (Store.sound.freqDatas.uSoundMedium * .5) + (Store.sound.freqDatas.uSoundHighAcute * .5) + (Store.sound.freqDatas.uSoundAcute * .5)) * .04) * - Math.PI * .1
      // this.particlesGroup.scale.z = 1 -Math.abs(Store.sound.freqDatas.uSoundBass * .1) * - Math.PI * .1
      this.torusMesh.material.uniforms.uTime.value = et
      
      for(const [key, value] of Object.entries(Store.sound.freqDatas)) {
         this.torusMesh.material.uniforms[key].value = value
      }


      if(!isNaN(this.mouse.x * 0.)) {
         this.target.x = -this.mouse.x * 0.2;
         this.target.y = this.mouse.y * 0.2;
      }

      this.particlesGroup.rotation.y += (.03 * (this.target.x / 2 - this.particlesGroup.rotation.y));
      this.particlesGroup.rotation.x += (.04 * (this.target.y / 2 - this.particlesGroup.rotation.x));
   }
}

export default Torus