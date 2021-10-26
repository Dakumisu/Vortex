const modelLinkBase = `../assets/3D/alphabet/`

const sampleLinkBase = `../assets/sound/samples/`
const beatsLinkBase = `${sampleLinkBase}beats/beat_`
const pianoLinkBase = `${sampleLinkBase}piano/piano_`
const bassLinkBase = `${sampleLinkBase}bass/bass_`

const musicLinkBase = `../assets/sound/music/`

export const Store = {
   // 3D Alphabet
   alphabet: {
      a: {
         key: 'a',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}a.glb`,
         state: false,
         sample: null,
         audio: null,
         id: null
      },
      b: {
         key: 'b',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}b.glb`,
         state: false,
         sample: null,
         audio: null,
         id: null
      },
      c: {
         key: 'c',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}c.glb`,
         state: false,
         sample: null,
         audio: null,
         id: null
      },
      d: {
         key: 'd',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}d.glb`,
         state: false,
         sample: null,
         audio: null,
         id: null
      },
      e: {
         key: 'e',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}e.glb`,
         state: false,
         sample: null,
         audio: null,
         id: null
      },
      f: {
         key: 'f',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}f.glb`,
         state: false,
         sample: null,
         audio: null,
         id: null
      },
      g: {
         key: 'g',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}g.glb`,
         state: false,
         sample: null,
         audio: null,
         id: null
      },
      h: {
         key: 'h',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}h.glb`,
         state: false,
         sample: null,
         audio: null,
         id: null
      },
      i: {
         key: 'i',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}i.glb`,
         state: false,
         sample: null,
         audio: null,
         id: null
      },
      j: {
         key: 'j',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}j.glb`,
         state: false,
         sample: null,
         audio: null,
         id: null
      },
      k: {
         key: 'k',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}k.glb`,
         state: false,
         sample: null,
         audio: null,
         id: null
      },
      l: {
         key: 'l',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}l.glb`,
         state: false,
         sample: null,
         audio: null,
         id: null
      },
      m: {
         key: 'm',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}m.glb`,
         state: false,
         sample: null,
         audio: null,
         id: null
      },
      n: {
         key: 'n',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}n.glb`,
         state: false,
         sample: null,
         audio: null,
         id: null
      },
      o: {
         key: 'o',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}o.glb`,
         state: false,
         sample: null,
         audio: null,
         id: null
      },
      p: {
         key: 'p',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}p.glb`,
         state: false,
         sample: null,
         audio: null,
         id: null
      },
      q: {
         key: 'q',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}q.glb`,
         state: false,
         sample: null,
         audio: null,
         id: null
      },
      r: {
         key: 'r',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}r.glb`,
         state: false,
         sample: null,
         audio: null,
         id: null
      },
      s: {
         key: 's',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}s.glb`,
         state: false,
         sample: null,
         audio: null,
         id: null
      },
      t: {
         key: 't',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}t.glb`,
         state: false,
         sample: null,
         audio: null,
         id: null
      },
      u: {
         key: 'u',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}u.glb`,
         state: false,
         sample: null,
         audio: null,
         id: null
      },
      v: {
         key: 'v',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}v.glb`,
         state: false,
         sample: null,
         audio: null,
         id: null
      },
      w: {
         key: 'w',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}w.glb`,
         state: false,
         sample: null,
         audio: null,
         id: null
      },
      x: {
         key: 'x',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}x.glb`,
         state: false,
         sample: null,
         audio: null,
         id: null
      },
      y: {
         key: 'y',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}y.glb`,
         state: false,
         sample: null,
         audio: null,
         id: null
      },
      z: {
         key: 'z',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}z.glb`,
         state: false,
         sample: null,
         audio: null,
         id: null
      },
   },

   alphabetDatas: {
      keysOrder: [
         'a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
         'q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm',
         'w', 'x', 'c', 'v', 'b', 'n'
      ],
      alphabetGroup: null,
      lettersInputLimit: 3,
      lettersCount: 0,
      alphabetArray: [
         null,
         null,
         null,
         null,
         null
      ],
      availableIndex: [
         0,
         1,
         2
      ],
      lettersPositions: {
         x: [ 
            -2,
            0,
            2
         ],
         z: [
            .0,
            .5,
            .0
         ],
      }
   },

   // Sound control
   sound: {
      samplesList: [
         `${beatsLinkBase}1.wav`, `${beatsLinkBase}2.wav`, `${beatsLinkBase}3.wav`, `${beatsLinkBase}4.wav`, `${beatsLinkBase}5.wav`, `${beatsLinkBase}6.wav`, `${beatsLinkBase}7.wav`, `${beatsLinkBase}8.wav`, `${beatsLinkBase}9.wav`, `${beatsLinkBase}10.wav`,
         `${pianoLinkBase}1.wav`, `${pianoLinkBase}2.wav`, `${pianoLinkBase}3.wav`, `${pianoLinkBase}4.wav`, `${pianoLinkBase}5.wav`, `${pianoLinkBase}6.wav`, `${pianoLinkBase}7.wav`, `${pianoLinkBase}8.wav`, `${pianoLinkBase}9.wav`, `${pianoLinkBase}10.wav`,
         `${bassLinkBase}1.wav`, `${bassLinkBase}2.wav`, `${bassLinkBase}3.wav`, `${bassLinkBase}4.wav`, `${bassLinkBase}5.wav`, `${bassLinkBase}6.wav`
      ],
      music: null,
      musicState: false,
      // {
         // music_1: `${musicLinkBase}music_1.mp3`,
         // music_2: `${musicLinkBase}music_2.mp3`,
         // music_3: `${musicLinkBase}music_3.mp3`,
         // music_4: `${musicLinkBase}music_4.mp3`,
         // music_5: `${musicLinkBase}music_5.mp3`,
      // }
      freqDatas: {
         uSoundLowBass: 0,
         uSoundBass: 0,
         uSoundHighBass: 0,
         uSoundLowMedium: 0,
         uSoundMedium: 0,
         uSoundHighMedium: 0,
         uSoundLowAcute: 0,
         uSoundAcute: 0,
         uSoundHighAcute: 0
      }
   },

   // Paramètres généraux
   params: {
      sizes: {
         width: window.innerWidth,
         height: window.innerHeight
      },
      pp: {
         aip: {
            damp: .75
         },
         rgbShift: {
            amount: .0011
         },
      },
      mouseDown: false,
      experienceStarted: false,
      progress: 0
   }
}