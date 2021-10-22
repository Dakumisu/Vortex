const modelLinkBase = `../assets/3D/alphabet/`

export const Store = {
   // 3D Alphabet
   alphabet: {
      a: {
         key: 'a',
         mesh: null,
         model: `${modelLinkBase}a.glb`
      },
      b: {
         key: 'b',
         mesh: null,
         model: `${modelLinkBase}b.glb`
      },
      c: {
         key: 'c',
         mesh: null,
         model: `${modelLinkBase}c.glb`
      },
      d: {
         key: 'd',
         mesh: null,
         model: `${modelLinkBase}d.glb`
      },
      e: {
         key: 'e',
         mesh: null,
         model: `${modelLinkBase}e.glb`
      },
      f: {
         key: 'f',
         mesh: null,
         model: `${modelLinkBase}f.glb`
      },
      g: {
         key: 'g',
         mesh: null,
         model: `${modelLinkBase}g.glb`
      },
      h: {
         key: 'h',
         mesh: null,
         model: `${modelLinkBase}h.glb`
      },
      i: {
         key: 'i',
         mesh: null,
         model: `${modelLinkBase}i.glb`
      },
      j: {
         key: 'j',
         mesh: null,
         model: `${modelLinkBase}j.glb`
      },
      k: {
         key: 'k',
         mesh: null,
         model: `${modelLinkBase}k.glb`
      },
      l: {
         key: 'l',
         mesh: null,
         model: `${modelLinkBase}l.glb`
      },
      m: {
         key: 'm',
         mesh: null,
         model: `${modelLinkBase}m.glb`
      },
      n: {
         key: 'n',
         mesh: null,
         model: `${modelLinkBase}n.glb`
      },
      o: {
         key: 'o',
         mesh: null,
         model: `${modelLinkBase}o.glb`
      },
      p: {
         key: 'p',
         mesh: null,
         model: `${modelLinkBase}p.glb`
      },
      q: {
         key: 'q',
         mesh: null,
         model: `${modelLinkBase}q.glb`
      },
      r: {
         key: 'r',
         mesh: null,
         model: `${modelLinkBase}r.glb`
      },
      s: {
         key: 's',
         mesh: null,
         model: `${modelLinkBase}s.glb`
      },
      t: {
         key: 't',
         mesh: null,
         model: `${modelLinkBase}t.glb`
      },
      u: {
         key: 'u',
         mesh: null,
         model: `${modelLinkBase}u.glb`
      },
      v: {
         key: 'v',
         mesh: null,
         model: `${modelLinkBase}v.glb`
      },
      w: {
         key: 'w',
         mesh: null,
         model: `${modelLinkBase}w.glb`
      },
      x: {
         key: 'x',
         mesh: null,
         model: `${modelLinkBase}x.glb`
      },
      y: {
         key: 'y',
         mesh: null,
         model: `${modelLinkBase}y.glb`
      },
      z: {
         key: 'z',
         mesh: null,
         model: `${modelLinkBase}z.glb`
      },
   },

   alphabetGroup: null,
   alphabetArray: [],
   letterIndex: 0,

   // Sound control
   sound: {
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
            damp: .8
         },
         rgbShift: {
            amount: .0011
         },
      },
      mouseDown: false,
      experienceStarted: false
   }
}