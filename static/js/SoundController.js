import gsap from 'gsap'
import { Store } from './Store' // Store
import * as THREE from 'three' // https://threejs.org/docs/
import { AudioListener, Audio, AudioLoader, AudioAnalyser, LuminanceFormat } from 'three'

class SoundController {
   constructor(opt) {
      this.camera = opt.camera
      
      this.listener = new AudioListener();
      this.camera.add( this.listener );

      this.currentPcmData = null
      this.oldPcmData = null

      this.audioLoader = new AudioLoader();
      this.init()
      // this.getSoundDatas()
   }

   init() {

      this.sound = new Audio( this.listener );



      // document.querySelector('.play').addEventListener('click', () => {
      setTimeout(() => {
         this.audioLoader.load('../assets/music/anchor.mp3', (buffer) => {
            console.log(this.sound);
            this.sound.setBuffer(buffer);
            this.sound.setLoop(false);
            this.sound.setVolume(0.1); // Ne pas oublier de bien remettre le bon niveau de freq par rapport au volume
            this.sound.play();
         });
      }, 6000);
      // })

      this.setAudioAnalyzer(this.sound)
   }

   addSample(letter) {
      // const listener = new AudioListener();
      // this.camera.add( listener );

      letter.sound = new Audio( this.listener );

      // this.audioLoader = new AudioLoader();

      this.audioLoader.load(letter.sample, (buffer) => {
         console.log(this.buffer);
         letter.sound.setBuffer(buffer);
         letter.sound.setLoop(true);
         letter.sound.setVolume(0.1); // Ne pas oublier de bien remettre le bon niveau de freq par rapport au volume
         letter.sound.play();
         letter.sound.connect()
      });

      this.combineAudio(letter.sound)
      console.log('here');
   }

   setAudioAnalyzer(sound) {
      this.analyserNode = new AudioAnalyser( sound, 2048 );
      this.pcmData = new Float32Array(this.analyserNode.analyser.fftSize)
      this.currentPcmData = this.pcmData
   }

   combineAudio(sound) {
      this.pcmData = this.currentPcmData
      console.log(this.pcmData);
      const newAnalyzerNode = new AudioAnalyser( sound, 2048 );
      const newPcmData = new Float32Array(newAnalyzerNode.analyser.fftSize)
      
      for (let i = 0; i < this.pcmData.length; i++) {
         this.pcmData[i] *= newPcmData[i]
      }

      this.currentPcmData = this.pcmData
   }

   removeSample() {

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

      this.getSoundDatas(this.pcmData)
   }
}

export default SoundController