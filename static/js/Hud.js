import gsap from 'gsap'
import { Store } from './Store'

class Hud {
   constructor(opt) {
      this.soundController = opt.soundController

      this.nodes = {}
      this.nodes.menuButton = document.querySelector("button.hud__button")
      this.nodes.hud = document.querySelector("div.hud")
      this.nodes.hudContainer = document.querySelector("div.hud__container")
      this.nodes.keyboardButtons = document.querySelectorAll("button.keyboard")
      this.nodes.musicButtons = document.querySelectorAll("button.music")
      this.nodes.fileButton = document.querySelector("button.buttonFileMusic")
      this.nodes.musicFile = document.querySelector("input.fileMusic")
      this.nodes.ppr = document.querySelector("span.ppr")
      this.mp3Name = null
      this.mp3Url = null

      let layoutInStorage = localStorage.getItem('keyboard') ? localStorage.getItem('keyboard') : 'azerty'

      this.resize()
      this.loadMusic()
      this.menu()
      this.musicControl()
      this.getKeyboard(layoutInStorage)
      this.changeKeyboard()
   }

   start() {
      Store.params.experienceStarted = true
   }

   getKeyboard(layout) {
      localStorage.setItem('keyboard', layout)
      // Assignations des samples au clavier
      if (localStorage.getItem('keyboard') != null) {
         if (localStorage.getItem('keyboard') == layout) {
            Store.alphabetDatas.keysOrder = Store.keyboardLayout[`${layout}Keyboard`]
         } else {
            Store.alphabetDatas.keysOrder = Store.keyboardLayout[`${layout}Keyboard`]
         }
      }

      Store.sound.samplesAssigned = false

      this.fillSamples(layout).then(() => {
         Store.sound.samplesAssigned = true
         this.soundController.fillSampleCache()
      })
   }
   
   async fillSamples(layout) {
      let fillLimit
      if (layout == 'azerty') fillLimit = [10, 10, 6]
      else fillLimit = [10, 9, 7]

      new Promise ( resolve => {
         for (let i = 0; i < fillLimit.length; i++) {
            for (let j = 0; j < fillLimit[i]; j++) {
               const index = Store.alphabetDatas.keysOrder[i][j]
               Store.alphabet[index].sample = Store.sound.samplesList[i][j]         
            }
         }
         
         resolve()
      })
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
      this.nodes.fileButton.addEventListener("click", (event) => {
         this.nodes.musicFile.click()
      })

      this.nodes.musicFile.addEventListener("change", (event) => {
         this.nodes.fileButton.blur()
         if (!event.target.files.length == 0) {
            var file = event.target.files; // File object

            this.mp3Name = file[0];
            this.mp3Url = URL.createObjectURL(file[0]);

            Store.sound.music = this.mp3Url
            this.nodes.ppr.innerHTML = 'Play'
         }
      })
   }

   musicControl() {
      this.nodes.musicButtons.forEach(button => {
         button.addEventListener('click', () => {
            button.blur()
            if (Store.sound.music) {
               if (button.dataset.state == "play") {
                  if (!Store.sound.musicState && !this.soundController.onPause) {
                     this.nodes.ppr.innerHTML = 'Pause'
                     this.soundController.music('play')
                  } else if (this.soundController.onPause && Store.sound.musicState) {
                     this.nodes.ppr.innerHTML = 'Pause'
                     this.soundController.music('resume')
                  } else {
                     this.nodes.ppr.innerHTML = 'Resume'
                     this.soundController.music('pause')
                  }
               } else if (button.dataset.state == "stop") {
                  this.nodes.ppr.innerHTML = 'Play'
                  this.soundController.music('stop')
               }
            }
         })
      })
   }

   menu() {
      this.nodes.menuButton.addEventListener('click', () => {
         this.nodes.hudContainer.style.display = 'none'
         this.nodes.hud.style.pointerEvents = 'none'
      })
   }

   resize() {
      window.addEventListener('resize', () => {

     })
   }   
}

export default Hud