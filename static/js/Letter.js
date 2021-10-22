import * as THREE from 'three'
import gsap from 'gsap'
import { Store } from './Store' // Store
import { Vector2 } from 'three'

class Letter {
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
      Store.alphabetDatas.alphabetGroup.add(this.mesh)

      const randomStartPositions = this.getRandomPositions()
      
      gsap.fromTo(this.mesh.position, 3, { x: randomStartPositions.x, ease: "Power3.easeOut" }, { x: Store.alphabetDatas.lettersPositions.x[this.mesh.uuid], ease: "Power3.easeOut" })
      // gsap.fromTo(this.mesh.position, 3, { y: randomStartPositions.y, ease: "Power3.easeOut" }, { y: (-.5 + Math.random()) * 10, ease: "Power3.easeOut" })
      gsap.to(this.mesh.position, 3, { y: 0, ease: "Power3.easeOut" })
      gsap.to(this.mesh.position, 3, { z: Store.alphabetDatas.lettersPositions.z[this.mesh.uuid], ease: "Power3.easeInOut" })
      gsap.to(this.mesh.rotation, 2, { z: 5* (Math.PI * 2), ease: "Power3.easeOut" })
   }

   remove() {
      gsap.to(this.mesh.rotation, 2, { z: 2* (Math.PI * 2), ease: "Power3.easeInOut" })
      gsap.to(this.mesh.position, 3, { z: -100, ease: "Power3.easeInOut" })
      gsap.to(this.mesh.material.uniforms.uAlpha, 2, { value: 0, ease: "Power3.easeOut", onComplete: () => {
         Store.alphabetDatas.letterIndex = this.mesh.uuid
         Store.alphabetDatas.alphabetArray.splice(this.mesh.uuid, 1, null)
         Store.alphabetDatas.letters --
         Store.alphabetDatas.alphabetGroup.remove(this.mesh)
      } })
   }

   getRandomPositions() {
      const randomXState = Math.random() > .5 ? 1 : -1
      const randomYState = Math.random() > .5 ? 1 : -1

      let variationPositionX, variationPositionY

      if (randomXState == 1) {
         variationPositionX = Math.random() * 2
      } else {
         variationPositionX = -Math.random() * 2
      }

      if (randomYState == 1) {
         variationPositionY = Math.random() * 2
      } else {
         variationPositionY = -Math.random() * 2
      }

      const randomStartPositions = {
         x: (randomXState * 5) + variationPositionX,
         y: (randomYState * 5) + variationPositionY
      }

      return randomStartPositions
   }

   update(time) {
      // if (this.mesh) {
      //    this.mesh.rotation.x = (time * .3) * Math.PI
      //    this.mesh.rotation.y = (time * .3) * Math.PI
      //    this.mesh.rotation.z = (time * .3) * Math.PI
      // }

      if(!isNaN(this.mouse.x * 0.)) {
         this.target.x = -this.mouse.x * 0.2;
         this.target.y = this.mouse.y * 0.2;
      }

      Store.alphabetDatas.alphabetGroup.rotation.y += (.1 * (this.target.x / 2 - Store.alphabetDatas.alphabetGroup.rotation.y));
      Store.alphabetDatas.alphabetGroup.rotation.x += (.1 * (this.target.y / 2 - Store.alphabetDatas.alphabetGroup.rotation.x));
   }
}

export default Letter