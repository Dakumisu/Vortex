import gsap from 'gsap'

import { Store } from '@js/Store'
import Hud from '@js/Hud'

Array.prototype.isNull = function () {
   for (var i = 0; i < this.length; i++)
     if (this[i] !== null)
       return false;
   return true;
}
class SoundController {
   constructor() {
      this.onPause = false

      this.samples = [
         {},
         {},
         {},
         {},
         {}
      ]

      this.musicSourceNode = null
      this.musicSourceNodeCache = null
      this.bufferStartTime = 0
      this.bufferPauseTime = 0
      this.bufferOffset = 0
      this.progressStart = 0

      this.tempo = 60000 / 130

      this.samplesCache = {}

      this.init()
      this.sampleLoop()
   }

   fillSampleCache() {
      for (const letter in Store.alphabet) {
         this.getDataSampleInCache(Store.alphabet[letter])
      }
   }

   unlockAudioContext(context) {
      if (context.state !== "suspended") return;
      const b = document.body;
      const events = ["touchstart", "touchend", "mousedown", "click", "keydown"];
      events.forEach(e => b.addEventListener(e, unlock, false));

      function unlock() {
         context.resume().then(clean())
      }

      function clean() {
         events.forEach(e => b.removeEventListener(e, unlock));
      }
   }

   init() {
      this.audioContext = new AudioContext()
      this.audioContext.resume()

      this.unlockAudioContext(this.audioContext)

      this.analyser = this.audioContext.createAnalyser()
      this.analyser.fftSize = 2048

      this.bufferLength = this.analyser.frequencyBinCount

      this.pcmData = new Float32Array(this.analyser.fftSize)
   }
   
   music(type) {
      if (type == 'play') {
         if (this.musicSourceNode == null) {
            // PLAY
            this.playMusic()
         } else {
            this.stopMusic()
            this.playMusic()
         }
      } else if (this.musicSourceNode && type == 'pause') {
         // PAUSE
         this.pauseMusic()
      } else if (this.musicSourceNode && type == 'stop') {
         // STOP
         this.stopMusic()
      } else if (this.musicSourceNode && type == 'resume') {
         // RESUME
         this.resumeMusic()
      }
   }

   playMusic() {
      Store.sound.musicState = true

      this.bufferStartTime = this.audioContext.currentTime
      this.startTime = this.audioContext.currentTime;
      this.loadData(Store.sound.music, 'music')
   }

   stopMusic() {
      if (!this.onPause) {
         this.musicSourceNode.disconnect(this.audioContext.destination)
         this.musicSourceNode.disconnect(this.analyser)
      }
      
      this.onPause = false
      this.musicSourceNode = null
      this.bufferOffset = 0
      Store.sound.musicState = false
      this.musicSourceNodeCache = null
   }

   pauseMusic() {
      this.onPause = true
      this.bufferPauseTime = this.audioContext.currentTime - this.bufferStartTime
      
      this.musicSourceNode.stop(0)
      this.musicSourceNode.disconnect(this.audioContext.destination)
      this.musicSourceNode.disconnect(this.analyser)
   }
   
   resumeMusic() {
      this.onPause = false

      this.bufferStartTime = this.audioContext.currentTime - this.bufferPauseTime

      this.bufferOffset = this.bufferPauseTime
      
      if (this.musicSourceNodeCache) {
         this.loadMusicBuffer(this.musicSourceNodeCache, true)
      } else {
         this.playMusic()
      }
   }

   loadMusicBuffer(response, cache) {
      if (cache) {
         this.musicSourceNode = this.audioContext.createBufferSource();
         this.musicSourceNode.buffer = this.musicSourceNodeCache;
         this.musicSourceNode.connect(this.audioContext.destination);
         this.musicSourceNode.connect(this.analyser)
         this.musicSourceNode.start(0, this.bufferOffset)
         this.musicSourceNode.loop = true
      } else (
         this.audioContext.decodeAudioData(response, buffer => {
            this.musicSourceNode = this.audioContext.createBufferSource();
            this.musicSourceNodeCache = buffer
            this.musicSourceNode.buffer = buffer;
            this.musicSourceNode.connect(this.audioContext.destination);
            this.musicSourceNode.connect(this.analyser)
            this.musicSourceNode.start(0, this.bufferOffset)
            this.musicSourceNode.loop = true
         })
      )

      setTimeout(() => {
         this.musicSourceNode.onended = () => {
            if (this.onPause) return
            Hud.nodes.playIcon.classList.remove('hide')
            Hud.nodes.pauseIcon.classList.add('hide')
            this.stopMusic()
         }
      }, 1000);
   }

   loadData(data, type) {
      const request = new XMLHttpRequest()

      request.open('GET', data, true)

      request.responseType = 'arraybuffer'

      request.onload = () => {
         const response = request.response;
         this.loadMusicBuffer(response, false)
      }
      
      request.send()
   }

   getDataSampleInCache(data) {
      const request = new XMLHttpRequest()

      request.open('GET', data.sample, true)

      request.responseType = 'arraybuffer'

      request.onload = () => {
         const response = request.response;

         this.audioContext.decodeAudioData(response, buffer => {
            this.samplesCache[data.key] = buffer
   
         })   
      }
      
      request.send()
   }

   sampleLoop() {
      let counter = 0
      setInterval(() => {
         if (counter == 0) {
            Store.sound.samplesPlayed.forEach((letter) => {
               if (letter != null)
                  this.playSample(letter)
            })
         }
         counter++;
         gsap.to(Store.sound, this.tempo / 1000, {
            loopProgress: counter / 15,
            ease: "Power0.easeNone"
         })
         if (counter == 16 || Store.sound.samplesPlayed.isNull()) {
            counter = 0
         }
      }, this.tempo);
   }

   playSample(letter) {
      this.samples[letter.id].bufferSource = this.audioContext.createBufferSource()
      this.samples[letter.id].bufferSource.buffer = this.samplesCache[letter.key]

      this.samples[letter.id].bufferSource.connect(this.audioContext.destination)
      this.samples[letter.id].bufferSource.connect(this.analyser)
      this.samples[letter.id].bufferSource.start(0)
   }
   
   addSample(letter) {
      this.samples[letter.id].bufferSource = this.audioContext.createBufferSource()
      this.samples[letter.id].bufferSource.buffer = this.samplesCache[letter.key]
      this.samples[letter.id].bufferSource.connect(this.audioContext.destination)
      this.samples[letter.id].bufferSource.connect(this.analyser)
   }

   removeSample(letter) {
      this.samples[letter.id].bufferSource.disconnect(this.audioContext.destination)
      this.samples[letter.id].bufferSource.disconnect(this.analyser)
      this.samples.splice(letter.id, 1, {})
   }

   getSoundDatas(datas) {
      Store.sound.freqDatas.uSoundLowBass = datas[0] * 1.25 * Store.sound.strength
      Store.sound.freqDatas.uSoundBass = datas[8] * 1.25 * Store.sound.strength
      Store.sound.freqDatas.uSoundHighBass = datas[16] * 1.25 * Store.sound.strength
      Store.sound.freqDatas.uSoundLowMedium = datas[32] * 1.25 * Store.sound.strength
      Store.sound.freqDatas.uSoundMedium = datas[64] * 1.25 * Store.sound.strength
      Store.sound.freqDatas.uSoundHighMedium = datas[128] * 1.25 * Store.sound.strength
      Store.sound.freqDatas.uSoundLowAcute = datas[256] * 1.25 * Store.sound.strength
      Store.sound.freqDatas.uSoundAcute = datas[512] * 1.25 * Store.sound.strength
      Store.sound.freqDatas.uSoundHighAcute = datas[1023] * 1.25 * Store.sound.strength
   }

   update(time) {
      this.analyser.getFloatTimeDomainData(this.pcmData)

      this.getSoundDatas(this.pcmData)
   }
}

const out = new SoundController()
export default out