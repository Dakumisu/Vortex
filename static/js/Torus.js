import * as THREE from 'three'
import gsap from 'gsap'
import vertex from '../glsl/vertex.glsl'
import fragment from '../glsl/fragment.glsl'
import { BoxBufferGeometry, BufferGeometry, Group, Mesh, MeshBasicMaterial, Points, SphereBufferGeometry, TorusBufferGeometry } from 'three'

class Torus {
   constructor(opt) {
      this.scene = opt.scene

      this.init()
      this.resize()
   }

   // init() { //Sphere version
   //    const torusGeometry = new TorusBufferGeometry( .4, .02, 30, 200 );
   //    const particlesCount = torusGeometry.attributes.position.array

   //    // this.geometry = new BufferGeometry()

   //    this.material = new THREE.ShaderMaterial({
   //       vertexShader: vertex,
   //       fragmentShader: fragment,
   //       uniforms: {
   //          uTime: { value : 0 },
   //          uColor: { value: new THREE.Color(0xffffff) },
   //          uAlpha: { value: 1 },
   //          uFreq: { value: 0 },
   //          uAspect : { value : new THREE.Vector2(this.scene.sizes.width, this.scene.sizes.height) },
   //          uPixelRatio: { value: window.devicePixelRatio }
   //       },
   //       side: THREE.DoubleSide,
   //       transparent: true,
   //       // wireframe: true

   //       /* pour les particules */
   //       // depthTest: false,
   //       // depthWrite: false,
   //       // blending: THREE.AdditiveBlending
   //    })

   //    // this.positions = new Float32Array(particlesCount.length)
      
   //    this.particlesGroup = new Group()
      
   //    for (let i = 0; i < particlesCount.length; i = i + 3) {
   //       // this.positions[i + 0] = particlesCount[i + 0]
   //       // this.positions[i + 1] = particlesCount[i + 1]
   //       // this.positions[i + 2] = particlesCount[i + 2]
         
   //       this.cubeGeo = new SphereBufferGeometry( .006, 64, 32 )
   //       this.particleMesh = new Mesh(this.cubeGeo, this.material)
   //       this.particleMesh.frustumCulled

   //       this.particleMesh.position.set(particlesCount[i + 0], particlesCount[i + 1], particlesCount[i + 2])
   //       this.particlesGroup.add(this.particleMesh)
   //    }

   //    // console.log(this.particlesGroup);

   //    this.scene.scene.add(this.particlesGroup)


   //    // console.log(particlesCount);
   //    // console.log(this.positions);

   //    // this.geometry.setAttribute( 'position', new THREE.BufferAttribute( this.positions, 3 ) );

      

   //    // this.torusMesh = new THREE.Mesh(torusGeometry, this.torusMaterial)
   //    // this.torusMesh.frustumCulled = false // https://threejs.org/docs/#api/en/core/Object3D.frustumCulled

   //    // this.scene.scene.add(this.torusMesh)
   // }
   
   
   // init() { //Points version
   //    const torusGeometry = new TorusBufferGeometry( .4, .02, 30, 200 );
   //    const particlesCount = torusGeometry.attributes.position.array

   //    this.positions = new Float32Array(particlesCount.length)
   //    this.randomPositions = new Float32Array(particlesCount.length)
            
   //    for (let i = 0; i < particlesCount.length; i = i + 3) {
   //       this.positions[i + 0] = particlesCount[i + 0]
   //       this.positions[i + 1] = particlesCount[i + 1]
   //       this.positions[i + 2] = particlesCount[i + 2]

   //       // Vortex
   //       const radius = Math.random() * 10
   //       const spinAngle = radius * 1.5
   //       const branchAngle = (i % 5) / 5 * (Math.PI * 2)

   //       const randomX = Math.cos(branchAngle + spinAngle) * radius + Math.pow(Math.random(), 3) * (Math.random())
   //       const randomY = Math.sin(branchAngle + spinAngle) * radius + Math.pow(Math.random(), 3) * (Math.random())
   //       const randomZ = -40 + (Math.sqrt((randomX * randomX) + (randomY * randomY) - .5) * 6)

   //       this.randomPositions[i + 0] = randomX
   //       this.randomPositions[i + 1] = randomY
   //       this.randomPositions[i + 2] = randomZ
   //    }
      
   //    this.material = new THREE.ShaderMaterial({
   //       vertexShader: vertex,
   //       fragmentShader: fragment,
   //       uniforms: {
   //          uTime: { value : 0 },
   //          uColor: { value: new THREE.Color(0xffffff) },
   //          uAlpha: { value: 1 },
   //          uFreq: { value: 0.5 },
   //          uSize: { value: 5 },
   //          uProgress: { value: 1 },
   //          uAspect : { value : new THREE.Vector2(this.scene.sizes.width, this.scene.sizes.height) },
   //          uPixelRatio: { value: window.devicePixelRatio }
   //       },
   //       side: THREE.DoubleSide,
   //       transparent: true,
   //       // wireframe: true,

   //       /* pour les particules */
   //       depthTest: false,
   //       depthWrite: false,
   //       blending: THREE.AdditiveBlending
   //    })

   //    this.geometry = new BufferGeometry()

   //    this.geometry.setAttribute( 'position', new THREE.BufferAttribute( this.positions, 3 ) );
   //    this.geometry.setAttribute( 'aRandomPos', new THREE.BufferAttribute( this.randomPositions, 3 ) );

   //    this.torusMesh = new Points(this.geometry, this.material)
   //    this.torusMesh.frustumCulled = false

   //    this.scene.scene.add(this.torusMesh)

   //    // this.start()
   // }
   
   init() { //Instanced Buffer Geo version
      const torusGeometry = new TorusBufferGeometry( .4, .02, 30, 200 );
      const particlesCount = torusGeometry.attributes.position.array

      this.blueprintParticle = new THREE.PlaneBufferGeometry()
      this.blueprintParticle.scale(.1, .1, .1)
      // this.blueprintParticle.rotateY(Math.PI)

      this.geometry = new THREE.InstancedBufferGeometry()
      
      this.geometry.index = this.blueprintParticle.index
      this.geometry.attributes.position = this.blueprintParticle.attributes.position
      this.geometry.attributes.normal = this.blueprintParticle.attributes.normal
      this.geometry.attributes.uv = this.blueprintParticle.attributes.uv

      this.positions = new Float32Array(particlesCount.length)
      this.randomPositions = new Float32Array(particlesCount.length)
      this.timeOffset = new Float32Array(particlesCount.length)
            
      for (let i = 0; i < particlesCount.length; i = i + 3) {
         this.positions[i + 0] = particlesCount[i + 0]
         this.positions[i + 1] = particlesCount[i + 1]
         this.positions[i + 2] = particlesCount[i + 2]

         // Vortex
         const radius = Math.random() * 10
         const spinAngle = radius * 5
         const branchAngle = (i % 5) / 5 * (Math.PI * 2)

         const randomX = Math.cos(branchAngle + spinAngle) * radius + Math.pow(Math.random(), 3) * (Math.random())
         const randomY = Math.sin(branchAngle + spinAngle) * radius + Math.pow(Math.random(), 3) * (Math.random())
         const randomZ = -40 + (Math.sqrt((randomX * randomX) + (randomY * randomY) - 2) * 6)

         this.randomPositions[i + 0] = randomX
         this.randomPositions[i + 1] = randomY
         this.randomPositions[i + 2] = randomZ

         this.timeOffset[i] = THREE.MathUtils.randFloatSpread(300)
      }
      
      this.material = new THREE.ShaderMaterial({
         vertexShader: vertex,
         fragmentShader: fragment,
         uniforms: {
            uTime: { value : 0 },
            uColor: { value: new THREE.Color(0xffffff) },
            uAlpha: { value: .1 },
            uFreq: { value: 0.5 },
            uSize: { value: 5 },
            uProgress: { value: 1 },
            uAspect : { value : new THREE.Vector2(this.scene.sizes.width, this.scene.sizes.height) },
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

      this.geometry.setAttribute( 'aPosition', new THREE.InstancedBufferAttribute( this.positions, 3 ) );
      this.geometry.setAttribute( 'aRandomPos', new THREE.InstancedBufferAttribute( this.randomPositions, 3 ) );
      this.geometry.setAttribute( 'aTimeOffset', new THREE.InstancedBufferAttribute( this.timeOffset, 1, false ) )


      console.log(this.geometry);

      this.torusMesh = new Mesh(this.geometry, this.material)
      this.torusMesh.frustumCulled = false

      this.particlesGroup = new THREE.Group()
      this.particlesGroup.add(this.torusMesh)

      this.scene.scene.add(this.torusMesh)

      // this.start()
   }


   start() {
      gsap.from(this.torusMesh.position, 4, { y: -5, ease: "Power3.easeInOut" })
      gsap.from(this.torusMesh.rotation, 2, { y: .5 * (Math.PI * 2), ease: "Power3.easeOut", delay: 2})
      this.fakeAudioScale()
   }

   expand(bool) {
      if (bool) {
         gsap.to(this.torusMesh.scale, .5, { x: 0, y: 0, z: 0, ease: "Expo.easeInOut"})
         gsap.to(this.torusMesh.scale, .5, { x: 1, y: 1, z: 1, ease: "Expo.easeInOut", delay: .5})
         gsap.to(this.torusMesh.material.uniforms.uProgress, 1.1, { value: .75, ease: "Expo.easeInOut", delay: .5})
      } else {
         gsap.to(this.torusMesh.material.uniforms.uProgress, 2, { value: 0, ease: "Expo.easeOut"})
      }
   }

   fakeAudioScale() {
      const rdmScale = Math.random() * 2
      gsap.to(this.torusMesh.scale, .5, { x: rdmScale, y: rdmScale, z: rdmScale, ease: "Power3.easeInOut", yoyo: true, repeat: -1})
   }

   resize() {
      window.addEventListener('resize', () => {
         this.material.uniforms.uAspect.value = new THREE.Vector2(this.scene.sizes.width, this.scene.sizes.height)
         this.material.uniforms.uPixelRatio.value = window.devicePixelRatio
     })
   }

   update(time) {
      this.torusMesh.rotation.z = time * - Math.PI * .1
      // this.torusMesh.position.z = time
      // this.torusMesh.rotation.y = time * - Math.PI * .2
      // this.torusMesh.rotation.x = time * - Math.PI * .2
      const rdmScale = Math.random() * 100
      gsap.to(this.torusMesh.material.uniforms.uFreq, .1, { value: rdmScale, ease: "Power3.easeInOut"})
      // this.torusMesh.material.uniforms.uFreq.value = rdmScale


      this.torusMesh.material.uniforms.uTime.value = time
   }
}

export default Torus