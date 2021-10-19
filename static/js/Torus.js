import * as THREE from 'three'
import gsap from 'gsap'
import vertex from '../glsl/vertex.vert'
import fragment from '../glsl/fragment.frag'
import { BoxBufferGeometry, BufferGeometry, Group, Mesh, MeshBasicMaterial, Points, SphereBufferGeometry, TorusBufferGeometry } from 'three'

class Blueprint {
   constructor(opt) {
      this.scene = opt.scene

      this.init()
      this.resize()
   }

   // init() { //Sphere version
   //    const torusGeometry = new TorusBufferGeometry( .4, .02, 30, 200 );
   //    const torusVertices = torusGeometry.attributes.position.array

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

   //    // this.positions = new Float32Array(torusVertices.length)
      
   //    this.particlesGroup = new Group()
      
   //    for (let i = 0; i < torusVertices.length; i = i + 3) {
   //       // this.positions[i + 0] = torusVertices[i + 0]
   //       // this.positions[i + 1] = torusVertices[i + 1]
   //       // this.positions[i + 2] = torusVertices[i + 2]
         
   //       this.cubeGeo = new SphereBufferGeometry( .006, 64, 32 )
   //       this.particleMesh = new Mesh(this.cubeGeo, this.material)
   //       this.particleMesh.frustumCulled

   //       this.particleMesh.position.set(torusVertices[i + 0], torusVertices[i + 1], torusVertices[i + 2])
   //       this.particlesGroup.add(this.particleMesh)
   //    }

   //    // console.log(this.particlesGroup);

   //    this.scene.scene.add(this.particlesGroup)


   //    // console.log(torusVertices);
   //    // console.log(this.positions);

   //    // this.geometry.setAttribute( 'position', new THREE.BufferAttribute( this.positions, 3 ) );

      

   //    // this.torusMesh = new THREE.Mesh(torusGeometry, this.torusMaterial)
   //    // this.torusMesh.frustumCulled = false // https://threejs.org/docs/#api/en/core/Object3D.frustumCulled

   //    // this.scene.scene.add(this.torusMesh)
   // }
   
   
   init() { //Points version
      const torusGeometry = new TorusBufferGeometry( .4, .02, 30, 200 );
      const torusVertices = torusGeometry.attributes.position.array

      this.geometry = new BufferGeometry()

      this.material = new THREE.ShaderMaterial({
         vertexShader: vertex,
         fragmentShader: fragment,
         uniforms: {
            uTime: { value : 0 },
            uColor: { value: new THREE.Color(0xffffff) },
            uAlpha: { value: 1 },
            uFreq: { value: 0.5 },
            uSize: { value: 5 },
            uProgress: { value: 0 },
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

      this.positions = new Float32Array(torusVertices.length)
      this.randomPositions = new Float32Array(torusVertices.length)
            
      for (let i = 0; i < torusVertices.length; i = i + 3) {
         this.positions[i + 0] = torusVertices[i + 0]
         this.positions[i + 1] = torusVertices[i + 1]
         this.positions[i + 2] = torusVertices[i + 2]

         this.randomPositions[i + 0] = (.5 - Math.random()) * 5
         this.randomPositions[i + 1] = (.5 - Math.random()) * 5
         this.randomPositions[i + 2] = Math.random() * 5
      }

      this.geometry.setAttribute( 'position', new THREE.BufferAttribute( this.positions, 3 ) );
      this.geometry.setAttribute( 'aRandomPos', new THREE.BufferAttribute( this.randomPositions, 3 ) );

      this.torusMesh = new Points(this.geometry, this.material)
      this.torusMesh.frustumCulled = false

      this.scene.scene.add(this.torusMesh)

      this.start()
   }

   start() {
      gsap.from(this.torusMesh.position, 4, { y: -5, ease: "Power3.easeInOut" })
      gsap.from(this.torusMesh.rotation, 2, { y: .5 * (Math.PI * 2), ease: "Power3.easeOut", delay: 2})
      // this.fakeAudioScale()
   }

   expand(bool) {
      if (bool)
         gsap.to(this.torusMesh.material.uniforms.uProgress, 1, { value: 1, ease: "Power3.easeOut"})
      else
         gsap.to(this.torusMesh.material.uniforms.uProgress, 1, { value: 0, ease: "Power3.easeOut"})
   }

   fakeAudioScale() {
      const rdmScale = 1.2
      gsap.to(this.torusMesh.scale, .5, { x: rdmScale, y: rdmScale, z: rdmScale, ease: "Power3.easeInOut", yoyo: true, repeat: -1, delay: 3})
   }

   resize() {
      window.addEventListener('resize', () => {
         this.material.uniforms.uAspect.value = new THREE.Vector2(this.scene.sizes.width, this.scene.sizes.height)
         this.material.uniforms.uPixelRatio.value = window.devicePixelRatio
     })
   }

   update(time) {
      this.torusMesh.rotation.z = time * - Math.PI * .1
      // this.torusMesh.rotation.y = time * - Math.PI * .2
      // this.torusMesh.rotation.x = time * - Math.PI * .2
      // this.torusMesh.material.uniforms.uFreq.value = rdmScale
      this.torusMesh.material.uniforms.uTime.value = time
   }
}

export default Blueprint