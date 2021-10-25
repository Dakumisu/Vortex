const modelLinkBase = `../assets/3D/alphabet/`
const sampleLinkBase = `../assets/sound/sample/`
const musicLinkBase = `../assets/sound/music/`

const keysOrder = [
   'a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'w', 'x', 'c', 'v', 'b', 'n'
]

// const samplesList = [
//    'a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'w', 'x', 'c', 'v', 'b', 'n'
// ]

export const Store = {
   // 3D Alphabet
   alphabet: {
      a: {
         key: 'a',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}a.glb`,
         state: false,
         sample: `${sampleLinkBase}a.wav`,
         audio: null,
         id: null
      },
      b: {
         key: 'b',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}b.glb`,
         state: false,
         sample: `${sampleLinkBase}b.wav`,
         audio: null,
         id: null
      },
      c: {
         key: 'c',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}c.glb`,
         state: false,
         sample: `${sampleLinkBase}c.wav`,
         audio: null,
         id: null
      },
      d: {
         key: 'd',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}d.glb`,
         state: false,
         sample: `${sampleLinkBase}d.wav`,
         audio: null,
         id: null
      },
      e: {
         key: 'e',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}e.glb`,
         state: false,
         sample: `${sampleLinkBase}e.wav`,
         audio: null,
         id: null
      },
      f: {
         key: 'f',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}f.glb`,
         state: false,
         sample: `${sampleLinkBase}f.wav`,
         audio: null,
         id: null
      },
      g: {
         key: 'g',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}g.glb`,
         state: false,
         sample: `${sampleLinkBase}g.wav`,
         audio: null,
         id: null
      },
      h: {
         key: 'h',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}h.glb`,
         state: false,
         sample: `${sampleLinkBase}h.wav`,
         audio: null,
         id: null
      },
      i: {
         key: 'i',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}i.glb`,
         state: false,
         sample: `${sampleLinkBase}i.wav`,
         audio: null,
         id: null
      },
      j: {
         key: 'j',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}j.glb`,
         state: false,
         sample: `${sampleLinkBase}j.wav`,
         audio: null,
         id: null
      },
      k: {
         key: 'k',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}k.glb`,
         state: false,
         sample: `${sampleLinkBase}k.wav`,
         audio: null,
         id: null
      },
      l: {
         key: 'l',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}l.glb`,
         state: false,
         sample: `${sampleLinkBase}l.wav`,
         audio: null,
         id: null
      },
      m: {
         key: 'm',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}m.glb`,
         state: false,
         sample: `${sampleLinkBase}m.wav`,
         audio: null,
         id: null
      },
      n: {
         key: 'n',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}n.glb`,
         state: false,
         sample: `${sampleLinkBase}n.wav`,
         audio: null,
         id: null
      },
      o: {
         key: 'o',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}o.glb`,
         state: false,
         sample: `${sampleLinkBase}o.wav`,
         audio: null,
         id: null
      },
      p: {
         key: 'p',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}p.glb`,
         state: false,
         sample: `${sampleLinkBase}p.wav`,
         audio: null,
         id: null
      },
      q: {
         key: 'q',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}q.glb`,
         state: false,
         sample: `${sampleLinkBase}q.wav`,
         audio: null,
         id: null
      },
      r: {
         key: 'r',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}r.glb`,
         state: false,
         sample: `${sampleLinkBase}r.wav`,
         audio: null,
         id: null
      },
      s: {
         key: 's',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}s.glb`,
         state: false,
         sample: `${sampleLinkBase}s.wav`,
         audio: null,
         id: null
      },
      t: {
         key: 't',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}t.glb`,
         state: false,
         sample: `${sampleLinkBase}t.wav`,
         audio: null,
         id: null
      },
      u: {
         key: 'u',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}u.glb`,
         state: false,
         sample: `${sampleLinkBase}u.wav`,
         audio: null,
         id: null
      },
      v: {
         key: 'v',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}v.glb`,
         state: false,
         sample: `${sampleLinkBase}v.wav`,
         audio: null,
         id: null
      },
      w: {
         key: 'w',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}w.glb`,
         state: false,
         sample: `${sampleLinkBase}w.wav`,
         audio: null,
         id: null
      },
      x: {
         key: 'x',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}x.glb`,
         state: false,
         sample: `${sampleLinkBase}x.wav`,
         audio: null,
         id: null
      },
      y: {
         key: 'y',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}y.glb`,
         state: false,
         sample: `${sampleLinkBase}y.wav`,
         audio: null,
         id: null
      },
      z: {
         key: 'z',
         mesh: null,
         instance: null,
         model: `${modelLinkBase}z.glb`,
         state: false,
         sample: `${sampleLinkBase}z.wav`,
         audio: null,
         id: null
      },
   },

   alphabetDatas: {
      alphabetGroup: null,
      lettersInputLimit: 5,
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
         2,
         3,
         4
      ],
      lettersPositions: {
         x: [ 
            -2,
            -1,
            0,
            1,
            2
         ],
         z: [
            .0,
            .25,
            .5,
            .25,
            .0,
         ],
      }
   },

   // Sound control
   sound: {
      music: {
         music_1: `${musicLinkBase}music_1.mp3`,
         music_2: `${musicLinkBase}music_2.mp3`,
         music_3: `${musicLinkBase}music_3.mp3`,
         music_4: `${musicLinkBase}music_4.mp3`,
         music_5: `${musicLinkBase}music_5.mp3`,
      },
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

   // Paramètres gééraux
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
      experienceStarted: false
   }
}