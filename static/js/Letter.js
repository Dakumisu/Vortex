import * as THREE from 'three'
import gsap from 'gsap'
import { Store } from './Store' // Store
import { Vector2 } from 'three'

class Letter {
   constructor(opt) {
      this.id = opt.id
      this.name = opt.name
      this.mouse = opt.mouse
      this.scene = opt.scene.scene

      this.randomStrength = 1 + (Math.random() * 2)

      this.letterMesh = opt.mesh.clone()
      this.letterMaterial = opt.mesh.material.clone()
      this.letterMesh.material = this.letterMaterial
      this.letterMesh.material.uniforms.uProgress.value = Store.params.progress
      this.letterMesh.uuid = this.id
      
      this.target = new Vector2(0, 0)

      this.add()
   }

   add() {
      Store.alphabetDatas.alphabetGroup.add(this.letterMesh)

      const randomStartPositions = this.getRandomPositions()
      
      gsap.fromTo(this.letterMesh.position, 3, { x: randomStartPositions.x, ease: "Power3.easeOut" }, { x: Store.alphabetDatas.lettersPositions.x[this.letterMesh.uuid], ease: "Power3.easeOut" })
      gsap.fromTo(this.letterMesh.position, 3, { y: randomStartPositions.y, ease: "Power3.easeOut" }, { y: 0, ease: "Power3.easeOut" })
      gsap.to(this.letterMesh.position, 3, { z: Store.alphabetDatas.lettersPositions.z[this.letterMesh.uuid], ease: "Power3.easeInOut" })
      gsap.to(this.letterMesh.rotation, 2, { z: 5* (Math.PI * 2), ease: "Power3.easeOut" })
   }

   remove() {
      gsap.to(this.letterMesh.rotation, 2, { z: 2* (Math.PI * 2), ease: "Power3.easeInOut" })
      gsap.to(this.letterMesh.position, 1.5, { z: -15, ease: "Power3.easeInOut" })
      gsap.to(this.letterMesh.material.uniforms.uAlpha, .5, { value: 0, ease: "Power3.easeInOut", onComplete: () => {
         Store.alphabetDatas.alphabetGroup.remove(this.letterMesh)
         Store.alphabetDatas.alphabetArray.splice(this.letterMesh.uuid, 1, null)
         Store.alphabet[this.name].id = null
         Store.alphabetDatas.lettersCount --
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

   vertigoEffect(dir) {
      if (dir == 3)
         gsap.to(this.letterMesh.material.uniforms.uAlpha, 1, { value: .0, ease: "Expo.easeInOut"})
   }
      
   noVertigoEffect() {
      gsap.to(this.letterMesh.material.uniforms.uAlpha, 1.5, { value: 1., ease: "Expo.easeInOut"})
   }

   expand(bool) {
      if (bool) {
         gsap.to(this.letterMesh.material.uniforms.uProgress, 1.1, { value: .75, ease: "Expo.easeInOut", delay: .4})
      } else {
         gsap.to(this.letterMesh.material.uniforms.uProgress, 2, { value: 0, ease: "Expo.easeOut"})
      }
   }

   update(time) {
      if (this.letterMesh) {
         const scale = .75 - (Store.sound.loopProgress / 4) + (Math.abs((Store.sound.freqDatas.uSoundBass * .1 + Store.sound.freqDatas.uSoundAcute * .1)))
         this.letterMesh.scale.set(scale, scale, scale)
         this.letterMesh.rotation.y = (time * .3) * Math.PI + this.randomStrength
         this.letterMesh.rotation.z = (time * .3) * Math.PI + this.randomStrength

         this.letterMesh.material.uniforms.uLoopSample.value = Store.sound.loopProgress
      }

      if (!Store.mobile.isOnMobile) {
         if(!isNaN(this.mouse.x * 0.)) {
            this.target.x = -this.mouse.x * 0.2;
            this.target.y = this.mouse.y * 0.2;
         }
   
         Store.alphabetDatas.alphabetGroup.rotation.y += (.05 * (this.target.x / 2 - Store.alphabetDatas.alphabetGroup.rotation.y));
         Store.alphabetDatas.alphabetGroup.rotation.x += (.05 * (this.target.y / 2 - Store.alphabetDatas.alphabetGroup.rotation.x));
      }
   }
}

export default Letter