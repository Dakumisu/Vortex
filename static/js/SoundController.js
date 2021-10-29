import gsap from 'gsap'
import { Store } from './Store' // Store
import * as THREE from 'three' // https://threejs.org/docs/
import { AudioListener, Audio, AudioLoader, AudioAnalyser, LuminanceFormat } from 'three'

class SoundController {
   constructor(opt) {
      this.camera = opt.camera

      this.samples = [
         null,
         null,
         null
      ]

      this.sourceNode = null

      this.audioLoader = new AudioLoader()

      this.tempo = 60000 / 130

      this.sampleLoop()

      this.init()
   }

   init() {
      this.audioContext = new AudioContext()
      this.audioContext.resume()

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
         if (counter == 16 || Store.sound.samplesPlayed[0] == null && Store.sound.samplesPlayed[1] == null && Store.sound.samplesPlayed[2] == null) {
            counter = 0
         }
      }, this.tempo);
   }

   playMusic() {
      if (Store.sound.music != null) {
         if (this.sourceNode == null) {
            this.sourceNode = this.audioContext.createBufferSource()
      
            this.sourceNode.connect(this.audioContext.destination)
            this.sourceNode.connect(this.analyser)
   
            if (!Store.sound.musicState) {
               Store.sound.musicState = true
               this.audioLoader.load(Store.sound.music, (buffer) => {
                  this.sourceNode.buffer = buffer;
                  this.sourceNode.loop = false;
                  this.sourceNode.start(0);
               });
            }
         } else {
            this.sourceNode.disconnect(this.audioContext.destination)
            this.sourceNode.disconnect(this.analyser)
            this.sourceNode = null
            Store.sound.musicState = false
   
            this.playMusic()
         }
      }
   }

   stopMusic() {
      if (this.sourceNode != null) {
         this.sourceNode.disconnect(this.audioContext.destination)
         this.sourceNode.disconnect(this.analyser)
         this.sourceNode = null
         Store.sound.musicState = false
      }
   }
   
   addSample(letter) {
      this.samples[letter.id] = this.audioContext.createBufferSource()
      this.samples[letter.id].connect(this.audioContext.destination)
      this.samples[letter.id].connect(this.analyser)
   }

   playSample(letter) {
      this.samples[letter.id] = this.audioContext.createBufferSource()

      this.samples[letter.id].connect(this.audioContext.destination)
      this.samples[letter.id].connect(this.analyser)

      this.audioLoader.load(letter.sample, (buffer) => {
         if (this.samples[letter.id] != null) {
            this.samples[letter.id].buffer = buffer;
            this.samples[letter.id].start(0)
         }
      })
   }
   
   removeSample(letter) {
      this.samples[letter.id].disconnect(this.audioContext.destination)
      this.samples[letter.id].disconnect(this.analyser)
      this.samples.splice(letter.id, 1, null)
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