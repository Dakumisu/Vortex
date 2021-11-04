import gsap from 'gsap'
import { Store } from './Store'

class Hud {
   constructor(opt) {
      this.soundController = opt.soundController

      this.nodes = {}
      this.nodes.keyboardButtons = document.querySelectorAll("button.keyboard")
      this.nodes.musicButtons = document.querySelectorAll("button.music")
      this.nodes.fileButton = document.querySelector(".fileMusic")
      this.mp3Name = null
      this.mp3Url = null

      this.init()
      this.resize()
      this.loadMusic()
      this.musicControl()
      this.getKeyboard()
      this.changeKeyboard()
   }
   
   init() {
   }

   start() {
      Store.params.experienceStarted = true
   }

   getKeyboard(layout = localStorage.getItem('keyboard') || 'azerty') {
      // Assignations des samples au clavier
      if (localStorage.length >= 1) {
         if (localStorage.getItem('keyboard') == layout) {
            Store.alphabetDatas.keysOrder = Store.keyboardLayout[`${layout}Keyboard`]
         } else {
            Store.alphabetDatas.keysOrder = Store.keyboardLayout[`${layout}Keyboard`]
         }
      }

      this.fillSamples()
   }
   
   fillSamples() {
      let i = 0
      for(const [key, value] of Object.entries(Store.alphabet)) {
         const index = Store.alphabetDatas.keysOrder[i]
         Store.alphabet[index].sample = Store.sound.samplesList[i]
         i++
      }
   }

   changeKeyboard() {
      this.nodes.keyboardButtons.forEach(button => {
         button.addEventListener('click', () => {
            const keyboardLayout = button.dataset.layout
            localStorage.setItem('keyboard', keyboardLayout)
            this.getKeyboard(keyboardLayout)
         })
      });
   }

   params() {

   }

   loadMusic() {
      this.nodes.fileButton.addEventListener("change", (event) => {
         this.nodes.fileButton.blur()
         if (!event.target.files.length == 0) {
            var file = event.target.files; // File object

            this.mp3Name = file[0];
            this.mp3Url = URL.createObjectURL(file[0]);

            Store.sound.music = this.mp3Url
         }
      })
   }

   musicControl() {
      this.nodes.musicButtons.forEach(button => {
         button.addEventListener('click', () => {
            button.blur()
            if (button.dataset.state == "play") {
               this.soundController.playMusic()
            } else {
               this.soundController.stopMusic()
            }
         })
      })
   }

   resize() {
      window.addEventListener('resize', () => {

     })
   }

   update(et) {

   }
}

export default Hud