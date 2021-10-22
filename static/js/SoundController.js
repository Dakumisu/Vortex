import gsap from 'gsap'
import { Store } from './Store' // Store
import * as THREE from 'three' // https://threejs.org/docs/
import { AudioListener, Audio, AudioLoader, AudioAnalyser, LuminanceFormat } from 'three'

class SoundController {
   constructor(opt) {
      this.camera = opt.camera

      this.init()
      // this.getSoundDatas()
   }

   init() {
      this.listener = new AudioListener();
      this.camera.add( this.listener );

      this.sound = new Audio( this.listener );

      const audioLoader = new AudioLoader();


      document.querySelector('.play').addEventListener('click', () => {
         audioLoader.load('../assets/music/anchor.mp3', (buffer) => {
            console.log(this.sound);
            this.sound.setBuffer(buffer);
            this.sound.setLoop(false);
            this.sound.setVolume(0.1); // Ne pas oublier de bien remettre le bon niveau de freq par rapport au volume
            this.sound.play();
         });
      })

      this.analyserNode = new AudioAnalyser( this.sound, 2048 );
      this.pcmData = new Float32Array(this.analyserNode.analyser.fftSize)
   }

   getSoundDatas(datas) {
      const range = datas.length / 8

      Store.sound.freqDatas.uSoundLowBass = datas[range * 0] * 20
      Store.sound.freqDatas.uSoundBass = datas[range * 1] * 20
      Store.sound.freqDatas.uSoundHighBass = datas[range * 2] * 20
      Store.sound.freqDatas.uSoundLowMedium = datas[range * 3] * 20
      Store.sound.freqDatas.uSoundMedium = datas[range * 4] * 20
      Store.sound.freqDatas.uSoundHighMedium = datas[range * 5] * 20
      Store.sound.freqDatas.uSoundLowAcute = datas[range * 6] * 20
      Store.sound.freqDatas.uSoundAcute = datas[range * 7] * 20
      Store.sound.freqDatas.uSoundHighAcute = datas[range * 8 - 1] * 20
   }
   
   update(time) {

      this.analyserNode.analyser.getFloatTimeDomainData(this.pcmData)

      // console.log(this.pcmData);

      let sumSquares = 0
      for (const amplitude of this.pcmData) {
         sumSquares += amplitude * amplitude
      }

      this.getSoundDatas(this.pcmData)

      // for(const [key, value] of Object.entries(Store.sound.freqDatas)) {
      //    console.log(key, value);
      // }

      this.volume = Math.sqrt(sumSquares / this.pcmData.length)

      Store.sound.freq = this.volume * 200
   }
}

export default SoundController