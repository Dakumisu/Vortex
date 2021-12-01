import gsap from 'gsap'

import { Store } from './Store'

class SoundController {
   constructor(opt) {
      this.onPause = false

      this.samples = [
         {},
         {},
         {}
      ]

      this.sourceNode = null
      this.musicTime = 0
      this.musicElpasedTime = 0

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
      const events = ["touchstart", "touchend", "mousedown", "keydown"];
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
         if (counter == 16 || Store.sound.samplesPlayed[0] == null && Store.sound.samplesPlayed[1] == null && Store.sound.samplesPlayed[2] == null) {
            counter = 0
         }
         // console.log(this.samplesCache.a)
      }, this.tempo);
   }

   music(type) {
      if (type == 'play') {
         if (this.sourceNode == null) {
            // PLAY
            this.playMusic()
         }
      } else if (this.sourceNode && type == 'pause') {
         // PAUSE
         this.pauseMusic()
      } else if (this.sourceNode && type == 'stop') {
         // STOP
         this.stopMusic()
      } else if (this.sourceNode && type == 'resume') {
         // RESUME
         this.resumeMusic()
      }
   }

   playMusic() {
      Store.sound.musicState = true
      // this.musicTime = 0
      this.loadData(Store.sound.music, 'music')
   }

   stopMusic() {
      this.sourceNode.disconnect(this.audioContext.destination)
      this.sourceNode.disconnect(this.analyser)
      this.sourceNode = null
      this.musicTime = 0
      this.musicElpasedTime = 0
      Store.sound.musicState = false
   }

   pauseMusic() {
      this.onPause = true
      this.musicTime = this.audioContext.currentTime
      this.sourceNode.stop()
      this.sourceNode.disconnect(this.audioContext.destination)
      this.sourceNode.disconnect(this.analyser)
   }

   resumeMusic() {
      this.onPause = false
      this.musicElpasedTime = this.audioContext.currentTime - this.musicTime

      this.playMusic()
   }

   loadMusicBuffer(response) {
      this.audioContext.decodeAudioData(response, buffer => {
         this.sourceNode = this.audioContext.createBufferSource();
         this.sourceNode.buffer = buffer;
         this.sourceNode.connect(this.audioContext.destination);
         this.sourceNode.connect(this.analyser)
         this.sourceNode.start(0, this.musicElpasedTime)
      })
   }

   loadData(data, type) {
      const request = new XMLHttpRequest()

      request.open('GET', data, true)

      request.responseType = 'arraybuffer'

      request.onload = () => {
         const response = request.response;
         this.loadMusicBuffer(response)
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
      Store.sound.freqDatas.uSoundLowBass = datas[0] * 1.25
      Store.sound.freqDatas.uSoundBass = datas[8] * 1.25
      Store.sound.freqDatas.uSoundHighBass = datas[16] * 1.25
      Store.sound.freqDatas.uSoundLowMedium = datas[32] * 1.25
      Store.sound.freqDatas.uSoundMedium = datas[64] * 1.25
      Store.sound.freqDatas.uSoundHighMedium = datas[128] * 1.25
      Store.sound.freqDatas.uSoundLowAcute = datas[256] * 1.25
      Store.sound.freqDatas.uSoundAcute = datas[512] * 1.25
      Store.sound.freqDatas.uSoundHighAcute = datas[1023] * 1.25
   }

   update(time) {
      this.analyser.getFloatTimeDomainData(this.pcmData)

      this.getSoundDatas(this.pcmData)
   }
}

export default SoundController