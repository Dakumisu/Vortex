import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js' // https://threejs.org/docs/#examples/en/loaders/GLTFLoader
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js' // https://threejs.org/docs/#examples/en/loaders/DRACOLoader
import gsap from 'gsap'
import { Store } from './Store' // Store
import vertex from '../glsl/letter/vertex.glsl'
import fragment from '../glsl/letter/fragment.glsl'
import { Group } from 'three'

class LoadAlphabet {
   constructor(opt) {
      this.scene = opt.scene

      this.loader = new GLTFLoader()
      this.dracoLoader = new DRACOLoader()
      this.dracoLoader.setDecoderPath('../assets/js/draco/')
      this.loader.setDRACOLoader(this.dracoLoader)

      Store.alphabetDatas.alphabetGroup = new Group()
      this.scene.add(Store.alphabetDatas.alphabetGroup)

      this.init()
   }

   init() {
      this.material = new THREE.ShaderMaterial({
         vertexShader: vertex,
         fragmentShader: fragment,
         uniforms: {
            uTime: { value : 0 },
            uColor: { value: new THREE.Color(0xff55ff) },
            uAlpha: { value: .75 },
            uFreq: { value: 0.5 },
            uSize: { value: 100 },
            uProgress: { value: 0 },
            uAspect : { value : new THREE.Vector2(Store.params.sizes.width, Store.params.sizes.height) },
            uPixelRatio: { value: window.devicePixelRatio }
         },
         side: THREE.DoubleSide,
         transparent: true,

         /* pour les particules */
         depthTest: false,
         depthWrite: false,
         blending: THREE.AdditiveBlending
      })
      

      for(const [key, value] of Object.entries(Store.alphabet)) {
         this.loader.load(
            value.model,
            (gltf) => {
               value.mesh = gltf.scene.children[0]
               value.mesh.name = value.key
               
               value.mesh.traverse((vertice) => {
                  if (vertice.isMesh) {
                     vertice.material = this.material
                  }
               })
   
               // const rdmScale = .5 + Math.random() * .5
   
               value.mesh.rotation.z = Math.PI * 2
               // value.mesh.scale.set(rdmScale, rdmScale, rdmScale)
            }
         )
      }
   }
}

export default LoadAlphabet