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
      setInterval(() => {
         console.log(this.tilt.x);
         console.log(this.tilt.y);
      }, 1000);
      window.addEventListener("deviceorientation", (event) => {
         // console.log(event.rotationRate.beta);
         const x = (event.beta.toFixed(2) / 15) - 2
         const y = (-event.gamma.toFixed(2) / 15)

         // this.tilt.x = x
         // this.tilt.y = y
         this.tilt.x = x
         this.tilt.y = y
         // this.tilt.y = 70 + -event.beta.toFixed(2)

         // -3 7
         // 3 7

         // -7 -3
         // 7 -3


         Store.mobile.tilt = this.tilt
         // console.log(this.tilt);
      })
   }
}

export default Tilt