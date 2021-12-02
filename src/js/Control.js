import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' // https://threejs.org/docs/#examples/en/controls/OrbitControls

import Scene from '@js/Scene'

class Control {
   constructor() {
      this.controls = new OrbitControls(Scene.camera, Scene.renderer.domElement)
      this.controls.enableDamping = true
   }

   update() {
      this.controls.update()
   }
}

export default Control