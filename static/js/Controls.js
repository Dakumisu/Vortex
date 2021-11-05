import gsap from 'gsap'

import Letter from './Letter'
import { Store } from './Store'

class Controls {
   constructor(opt) {
      this.soundController = opt.soundController
      this.scene = opt.scene
      this.mouse = opt.mouse
      this.torus = opt.torus

      this.nodes = {}
      this.nodes.canvas = document.querySelector('canvas.webgl')

      this.expandStateState = false

      this.resize()
      this.vertigoEffect()
      this.onKeyDown()
   }

   onKeyDown() {
      document.addEventListener('keydown', e => {
         // letters
         const key = e.key.toLowerCase()
         const regex = /[a-zA-Z]/
         const checkKey = e.getModifierState(key)
   
         if (key.match(regex)) {
            if (key.match(regex).input.length && key.match(regex).input.length == 1) {
               this.controlLetters(key)
            }
         }
   
         // expand
         if (e.code == "Space") {
            this.expand()
         }
      })
   
      // mobile expand
      this.nodes.canvas.addEventListener('touchstart', () => {
         this.expand()
      })
   }

   expand() {
      if (this.expandState) {
         this.expandState = false
         Store.params.progress = 0

         this.torus.expand(this.expandState)

         if (Store.alphabetDatas.alphabetArray.length) {
            Store.alphabetDatas.alphabetArray.forEach(letter => {
               if (letter !== null) {
                  letter.expand(this.expandState)
               }
            })
         }

         gsap.to(Store.params.pp.aip, 1, {
            damp: .75,
            ease: "Power3.easeInOut"
         })

         // Disable vertigo effect
         this.scene.noVertigoEffect()

         if (Store.alphabetDatas.alphabetArray.length) {
            Store.alphabetDatas.alphabetArray.forEach(letter => {
               if (letter !== null) {
                  letter.noVertigoEffect()
               }
            })
         }
      } else {
         this.expandState = true
         Store.params.progress = 1

         this.torus.expand(this.expandState)

         if (Store.alphabetDatas.alphabetArray.length) {
            Store.alphabetDatas.alphabetArray.forEach(letter => {
               if (letter !== null) {
                  letter.expand(this.expandState)
               }
            })
         }

         gsap.to(Store.params.pp.aip, 1, {
            damp: .825,
            ease: "Power3.easeInOut"
         })
      }
   }

   controlLetters(key) {
      if (!Store.alphabet[key].state) {
         this.addLetter(key)
      } else {
         this.removeLetter(key)
      }
   }

   addLetter(key) {
      if (Store.alphabetDatas.lettersCount < Store.alphabetDatas.lettersInputLimit) {
         Store.alphabetDatas.lettersCount++
         let currentIndex
         for (let i = 0; i < Store.alphabetDatas.availableIndex.length; i++) {
            if (Store.alphabetDatas.availableIndex[i] != null) {
               currentIndex = Store.alphabetDatas.availableIndex[i]
               Store.alphabetDatas.availableIndex.splice(i, 1, null)
               break
            }
         }

         Store.alphabet[key].state = true
         Store.alphabet[key].id = currentIndex
         Store.alphabet[key].instance = new Letter({
            id: currentIndex,
            name: Store.alphabet[key].key,
            scene: this.scene,
            mesh: Store.alphabet[key].mesh,
            mouse: this.mouse.mouseScene
         })

         Store.sound.samplesPlayed.splice(Store.alphabet[key].instance.id, 1, Store.alphabet[key])
         this.soundController.addSample(Store.alphabet[key])

         for (let i = 0; i < Store.alphabetDatas.alphabetArray.length; i++) {
            if (Store.alphabetDatas.alphabetArray[i] === null) {
               Store.alphabetDatas.alphabetArray[i] = Store.alphabet[key].instance
               return
            }
         }
      }
   }

   removeLetter(key) {
      Store.sound.samplesPlayed.splice(Store.alphabet[key].instance.id, 1, null)
      this.soundController.removeSample(Store.alphabet[key])
      Store.alphabetDatas.availableIndex.splice(Store.alphabet[key].instance.id, 1, Store.alphabet[key].instance.id)
      Store.alphabet[key].state = false
      Store.alphabet[key].instance.remove()
   }

   vertigoEffect() {
      this.nodes.canvas.addEventListener('mousedown', e => {
         Store.mouseDown = true
         if (Store.params.progress) {
            this.scene.vertigoEffect(e.which)
   
            if (Store.alphabetDatas.alphabetArray.length) {
               Store.alphabetDatas.alphabetArray.forEach(letter => {
                  if (letter !== null) {
                     letter.vertigoEffect(e.which)
                  }
               })
            }
         }
      });
   
      this.nodes.canvas.addEventListener('contextmenu', e => {
         e.stopPropagation()
         e.preventDefault()
         e.cancelBubble = true;
      });
   
      this.nodes.canvas.addEventListener('mouseup', e => {
         Store.mouseDown = false
   
         this.scene.noVertigoEffect()
   
         if (Store.alphabetDatas.alphabetArray.length) {
            Store.alphabetDatas.alphabetArray.forEach(letter => {
               if (letter !== null) {
                  letter.noVertigoEffect()
               }
            })
         }
      });
   }
   

   resize() {
      window.addEventListener('resize', () => {

      })
   }

   update(et) {

   }
}

export default Controls