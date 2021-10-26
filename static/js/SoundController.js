import gsap from 'gsap'
import { Store } from './Store' // Store
import * as THREE from 'three' // https://threejs.org/docs/
import { AudioListener, Audio, AudioLoader, AudioAnalyser, LuminanceFormat } from 'three'

class SoundController {
   constructor(opt) {
      this.camera = opt.camera

      this.samples = [
         {},
         {},
         {}
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
   }

   playMusic() {         
      this.sourceNode = this.audioContext.createBufferSource()

      this.sourceNode.connect(this.audioContext.destination)
      this.sourceNode.connect(this.analyser)
      console.log(Store.sound.music);

      if (Store.sound.music && !Store.sound.musicState) {
         Store.sound.musicState = true
         this.audioLoader.load(Store.sound.music, (buffer) => {
            this.sourceNode.buffer = buffer;
            this.sourceNode.loop = false;
            this.sourceNode.volume = .1
            this.sourceNode.start(0);
            console.log(this.sourceNode);
            // this.sourceNode.onended = onMusicEnd()
         });
      }
   }

   onMusicEnd() {
      this.sourceNode = null
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
   }
   
   removeSample(letter) {
      this.samples[letter.id].disconnect(this.audioContext.destination)
      this.samples[letter.id].disconnect(this.analyser)
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