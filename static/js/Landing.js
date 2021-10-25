import * as THREE from 'three'
import gsap from 'gsap'
import { Store } from './Store' // Store
import { Vector2 } from 'three'

class Landing {
   constructor(opt) {
      this.id = opt.id
      this.mouse = opt.mouse
      this.scene = opt.scene.scene

      this.mesh = opt.mesh.clone()
      this.meshMaterial = opt.mesh.material.clone()
      this.mesh.material = this.meshMaterial
      this.mesh.uuid = this.id
      
      this.target = new Vector2(0, 0)

      this.add()
   }

   add() {

   }

   start() {
      Store.params.experienceStarted = true
   }

   update(time) {

   }
}

export default Landing