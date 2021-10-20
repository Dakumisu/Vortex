import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js' // https://threejs.org/docs/#examples/en/loaders/GLTFLoader
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js' // https://threejs.org/docs/#examples/en/loaders/DRACOLoader
import gsap from 'gsap'
import { Store } from './Store' // Store
import vertex from '../glsl/letter/vertex.glsl'
import fragment from '../glsl/letter/fragment.glsl'

class LoadAlphabet {
   constructor(opt) {
      // this.name = opt.name // nom du model
      // this.model = opt.model // lien du model (ex: '../assets/3D/model.glb')
      // this.scene = opt.scene.scene

      // console.log([...Store.alphabet]);
      

      // this.alphabetModel = []


      this.loader = new GLTFLoader()
      this.dracoLoader = new DRACOLoader()
      this.dracoLoader.setDecoderPath('../assets/js/draco/')
      this.loader.setDRACOLoader(this.dracoLoader)

      this.init()
   }

   init() {
      this.material = new THREE.ShaderMaterial({
         vertexShader: vertex,
         fragmentShader: fragment,
         uniforms: {
            uTime: { value : 0 },
            uColor: { value: new THREE.Color(0xffffff) },
            uAlpha: { value: 1 },
            uFreq: { value: 0.5 },
            uSize: { value: 100 },
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
      

      for(const [key, value] of Object.entries(Store.alphabet)) {
         console.log(key);
         console.log(value);
         
         this.loader.load(
            value.model,
            (gltf) => {
               console.log('success')
               value.mesh = gltf.scene.children[0]
               value.mesh.name = value.key
               console.log(gltf.scene.children[0])
               
               value.mesh.traverse((vertice) => {
                  if (vertice.isMesh) {
                     vertice.material = this.material
                  }
               })
   
               const rdmScale = 1 + Math.random()
   
               value.mesh.rotation.z = Math.PI * 2
               value.mesh.scale.set(rdmScale, rdmScale, rdmScale)

               // this.add(value.mesh)
            },
            (progress) => {
               // console.log('progress')
               // console.log(progress)
            },
            (error) => {
               console.log('error')
               console.log(error)
            }
         )
      }

      console.log(Store.alphabet);

      // this.asyncMesh = await this.loader.loadAsync(this.model)
      // this.modelMesh = this.asyncMesh.scene.children[0]
      
      // const modelMaterial = new THREE.MeshBasicMaterial()

      // this.modelMesh.traverse((vertice) => {
      //    if (vertice.isMesh) {
      //       vertice.material = modelMaterial
      //    }
      // })

      // this.scene.add(this.modelMesh)

      // setTimeout(() => {
      //    this.add()
      // }, 100);
   }
}

export default LoadAlphabet