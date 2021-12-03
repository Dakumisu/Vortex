import gsap from 'gsap'
import SoundController from '@js/SoundController'
import { Store } from '@js/Store'

class Hud {
   constructor() {
      this.nodes = {}
      this.nodes.menuButton = document.querySelector("button.hud__button")
      this.nodes.hud = document.querySelector("div.hud")
      this.nodes.hudContainer = this.nodes.hud.querySelector(".hud__container")
      // this.nodes.hudContainerCenter = this.nodes.hudContainer.querySelector(".center")

      this.nodes.keyboardButtons = document.querySelectorAll("button.keyboard-layout")

      this.nodes.musicButtons = document.querySelectorAll("button.music")
      this.nodes.fileButton = document.querySelector("button.buttonFileMusic")
      this.nodes.musicFile = document.querySelector("input.fileMusic")
      this.nodes.playIcon = document.querySelector("svg.play_icon")
      this.nodes.pauseIcon = document.querySelector("svg.pause_icon")
      this.nodes.musicInfos = document.querySelector("div.music-infos")

      this.nodes.letterAzerty = document.querySelector(`.keyboard--azerty`)
      this.nodes.letterQwerty = document.querySelector(`.keyboard--qwerty`)

      this.nodes.countMelodies = document.querySelector(`.text .melodies`)
      this.nodes.countBasses = document.querySelector(`.text .basses`)
      
      this.mp3Name = null
      this.mp3Url = null

      this.menuOn = false

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

      this.nodes.keyboardButtons.forEach(e => {
         e.dataset.layout == layout ? e.classList.add('active') : e.classList.remove('active')
      })

      Store.sound.samplesAssigned = false

      this.fillSamples(layout).then(() => {
         Store.sound.samplesAssigned = true
         SoundController.fillSampleCache()
      })
   }
   
   async fillSamples(layout) {
      let fillLimit

      if (layout == 'azerty') {
         fillLimit = [10, 10, 6]
         this.nodes.letterAzerty.classList.remove('keyboard--default')
         this.nodes.letterQwerty.classList.add('keyboard--default')
         this.nodes.countMelodies.innerHTML = fillLimit[1]
         this.nodes.countBasses.innerHTML = fillLimit[2]
      } else {
         fillLimit = [10, 9, 7]
         this.nodes.letterAzerty.classList.add('keyboard--default')
         this.nodes.letterQwerty.classList.remove('keyboard--default')
         this.nodes.countMelodies.innerHTML = fillLimit[1]
         this.nodes.countBasses.innerHTML = fillLimit[2]
      }

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
            button.blur()
            
            this.nodes.keyboardButtons.forEach(e => {
               e == button ? e.classList.add('active') : e.classList.remove('active')
            })

            const keyboardLayout = button.dataset.layout
            localStorage.setItem('keyboard', keyboardLayout)
            this.getKeyboard(keyboardLayout)
         })
      });
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
            
            
            const regex = /\.(mp3|wav|mp4)/i;
            // /\.(jpg|png|gif|svg)$/
            const musicName = this.mp3Name.name.replace(regex, '')
            
            Store.sound.music = this.mp3Url
            this.nodes.musicInfos.children[1].innerHTML = musicName
            this.nodes.musicInfos.classList.remove('hide')
            this.newMusic = true
            this.nodes.playIcon.classList.remove('hide')
            this.nodes.pauseIcon.classList.add('hide')
         }
      })
   }

   musicControl() {
      this.nodes.musicButtons.forEach(button => {
         button.addEventListener('click', () => {
            button.blur()
            if (Store.sound.music) {
               if (button.dataset.state == "play") {
                  if (!Store.sound.musicState && !SoundController.onPause || this.newMusic) {
                     this.newMusic = false
                     // this.nodes.ppr.innerHTML = 'Pause'
                     SoundController.music('play')
                     this.nodes.playIcon.classList.add('hide')
                     this.nodes.pauseIcon.classList.remove('hide')
                  } else if (SoundController.onPause && Store.sound.musicState) {
                     // this.nodes.ppr.innerHTML = 'Pause'
                     this.nodes.playIcon.classList.add('hide')
                     this.nodes.pauseIcon.classList.remove('hide')
                     SoundController.music('resume')
                  } else {
                     this.nodes.playIcon.classList.remove('hide')
                     this.nodes.pauseIcon.classList.add('hide')
                     // this.nodes.ppr.innerHTML = 'Resume'
                     SoundController.music('pause')
                  }
               } else if (button.dataset.state == "stop") {
                  this.nodes.playIcon.classList.remove('hide')
                  this.nodes.pauseIcon.classList.add('hide')
                  // this.nodes.ppr.innerHTML = 'Play'
                  SoundController.music('stop')
               }
            }
         })
      })
   }

   menu() {
      // this.nodes.hudContainer.classList.add('fadeOpacity')
      // this.nodes.hud.classList.add('fadeOpacity')
      
      this.nodes.menuButton.addEventListener('click', () => {
         this.nodes.menuButton.blur()

         if (!this.menuOn) {
            this.openMenu()
         } else {
           this.closeMenu()
         }
      })
   }

   openMenu() {
      this.menuOn = true
      this.nodes.hudContainer.classList.add('fadeIn')
      this.nodes.hud.classList.add('fadeIn')

      this.nodes.menuButton.classList.add('menuOpen')
      this.nodes.menuButton.classList.remove('menuClose')
   }

   closeMenu() {
      this.menuOn = false
      this.nodes.hudContainer.classList.remove('fadeIn')
      this.nodes.hud.classList.remove('fadeIn')

      this.nodes.menuButton.classList.add('menuClose')
      this.nodes.menuButton.classList.remove('menuOpen')
   }

   resize() {
      window.addEventListener('resize', () => {

     })
   }   
}

const out = new Hud()
export default out