import * as THREE from 'three'
import { Store } from './Store'

class Tilt {
   constructor() {
      
      this.init()
      this.getTilt()
   }

   init() {
      this.tilt = new THREE.Vector2( {
         x: 0,
         y: 0
      })
   }

   getTilt() {
      window.addEventListener("deviceorientation", (event) => {
         const x = (event.beta.toFixed(2) / 15) - 2
         const y = (-event.gamma.toFixed(2) / 15)

         this.tilt.x = x
         this.tilt.y = y

         Store.mobile.tilt = this.tilt
      })
   }
}

export default Tilt