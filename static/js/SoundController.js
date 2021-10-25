import gsap from 'gsap'
import { Store } from './Store' // Store
import * as THREE from 'three' // https://threejs.org/docs/
import { AudioListener, Audio, AudioLoader, AudioAnalyser, LuminanceFormat } from 'three'

class SoundController {
   constructor(opt) {
      this.camera = opt.camera

      this.sourceNode = {}

      this.samples = [
         {},
         {},
         {},
         {},
         {},
      ]

      this.audioLoader = new AudioLoader()

      this.init()
   }

   init() {
      this.audioContext = new AudioContext()
      this.audioContext.resume()

      this.analyser = this.audioContext.createAnalyser()
      this.analyser.fftSize = 2048

      this.bufferLength = this.analyser.frequencyBinCount

      this.pcmData = new Float32Array(this.analyser.fftSize)

      this.playMusic()
   }

   playMusic() {
      this.sourceNode = this.audioContext.createBufferSource()

      this.sourceNode.connect(this.audioContext.destination)
      this.sourceNode.connect(this.analyser)

      document.querySelector('.play').addEventListener('click', () => {
         this.audioLoader.load(Store.sound.music.music_4, (buffer) => {
            this.sourceNode.buffer = buffer;
            this.sourceNode.loop = true;
            this.sourceNode.volume = .1
            this.sourceNode.start(0);
         });
      })
   }

   addSample(letter) {
      this.samples[letter.id] = this.audioContext.createBufferSource()

      this.samples[letter.id].connect(this.audioContext.destination)
      this.samples[letter.id].connect(this.analyser)

      this.audioLoader.load(letter.sample, (buffer) => {
         this.samples[letter.id].buffer = buffer;
         this.samples[letter.id].loop = true;
         this.samples[letter.id].volume = .1
         this.samples[letter.id].start(0);
      });
      
      console.log(this.samples)
   }
   
   removeSample(letter) {
      this.samples[letter.id].disconnect(this.audioContext.destination)
      this.samples[letter.id].disconnect(this.analyser)
      this.samples.splice(letter.id, 1, {})
      console.log(this.samples)
   }

   getSoundDatas(datas) {
      Store.sound.freqDatas.uSoundLowBass = datas[0]
      Store.sound.freqDatas.uSoundBass = datas[8]
      Store.sound.freqDatas.uSoundHighBass = datas[16]
      Store.sound.freqDatas.uSoundLowMedium = datas[32]
      Store.sound.freqDatas.uSoundMedium = datas[64]
      Store.sound.freqDatas.uSoundHighMedium = datas[128]
      Store.sound.freqDatas.uSoundLowAcute = datas[256]
      Store.sound.freqDatas.uSoundAcute = datas[512]
      Store.sound.freqDatas.uSoundHighAcute = datas[1023]
   }
   
   update(time) {
      this.analyser.getFloatTimeDomainData(this.pcmData)

      this.getSoundDatas(this.pcmData)
   }
}

export default SoundController