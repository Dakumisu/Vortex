import './main.scss'

import * as THREE from 'three' // https://threejs.org/docs/
import { TweenLite, TweenMax, gsap } from 'gsap' // https://greensock.com/docs/
import howlerjs from 'howler' // https://github.com/goldfire/howler.js#documentation

// import SoundCloudAPI from '../static/js/SoundCloudAPI' // Soundcloud API

import { Store } from '../static/js/Store' // Store
import Scene from '../static/js/Scene' // Création de la scène + renderer + camera
import LoadAlphabet from '../static/js/LoadAlphabet' // Chargement de l'alphabet
import Letter from '../static/js/Letter' // Ajout d'une lettre à la scène
import Mouse from '../static/js/Mouse' // Obtenir la position de la souris dans tous les environnement
import Torus from '../static/js/Torus' // Torus
import SoundController from '../static/js/SoundController' // Sound Controller
import CheckLanguage from '../static/js/CheckLanguage' // Sound Controller
import Control from '../static/js/Control' // Orbitcontrol (pour le debbugage)
import Settings from '../static/js/Settings.js' // Dat.gui (toujours pour le debbugage)

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Mobile
} else {
    // Desktop
}

// const settings = new Settings()

// new SoundCloudAPI()

// new CheckLanguage();

// Assignations des samples au clavier (AZERTY)
(function fillSamples() {
    let i = 0
    for(const [key, value] of Object.entries(Store.alphabet)) {
        const index = Store.alphabetDatas.keysOrder[i]
        Store.alphabet[index].sample = Store.sound.samplesList[i]
        i++
    }
}());

let mp3Name, mp3Url

const handleFileSelect = (evt) => {
    var file = evt.target.files; // File object

    // if (sourceNode) {
    //     sourceNode.stop();
    // }

    mp3Name = file[0];
    mp3Url = URL.createObjectURL(file[0]);

    Store.sound.music = mp3Url

    // console.log(mp3Url);
    // music();
}

document.getElementById("file").addEventListener("change", handleFileSelect, false);


const scene = new Scene({
    canvas: document.querySelector('.webgl'),
})

const mouse = new Mouse({
    scene: scene
})

const torus = new Torus({
    scene: scene,
    mouse: mouse.mouseScene
})

const soundController = new SoundController({
    camera: scene.camera
})

new LoadAlphabet({
    scene: scene.scene
})

// const control = new Control({
//     camera: scene.camera,
//     renderer: scene.renderer
// })


// document.querySelector('.webgl').addEventListener('touchstart', e => {
//     const letters = 'abcdefghijklmnopqrstuvwxyz'.charAt(Math.floor(Math.random() * 25))
//     Store.alphabetDatas.alphabetArray.push(new Letter({
//         scene: scene,
//         mesh: Store.alphabet[letters].mesh
//     }))
// })
let expand = false

document.addEventListener('keydown', e => {
    const key = e.key.toLowerCase()
    const regex = /[a-zA-Z]/
    const checkKey =  e.getModifierState(key)

    if (key.match(regex)) {
        if (key.match(regex).input.length && key.match(regex).input.length == 1) {
            if (!Store.alphabet[key].state) {
                if (Store.alphabetDatas.lettersCount < Store.alphabetDatas.lettersInputLimit) {
                    Store.alphabetDatas.lettersCount ++
                    let currentIndex
                    for (let i = 0; i < Store.alphabetDatas.availableIndex.length; i++) {
                        if (Store.alphabetDatas.availableIndex[i] != null) {
                            currentIndex = Store.alphabetDatas.availableIndex[i]
                            Store.alphabetDatas.availableIndex.splice(i, 1, null)
                            break
                        }
                    }

                    Store.alphabet[key].state = true
                    Store.alphabet[key].id = currentIndex
                    Store.alphabet[key].instance = new Letter({
                        id: currentIndex,
                        name: Store.alphabet[key].key,
                        scene: scene,
                        mesh: Store.alphabet[key].mesh,
                        mouse: mouse.mouseScene
                    })

                    soundController.addSample(Store.alphabet[key])

                    for (let i = 0; i < Store.alphabetDatas.alphabetArray.length; i++) {
                        if (Store.alphabetDatas.alphabetArray[i] === null) {
                            Store.alphabetDatas.alphabetArray[i] = Store.alphabet[key].instance
                            return
                        }
                    }
                }
            } else {
                soundController.removeSample(Store.alphabet[key])
                Store.alphabet[key].state = false
                Store.alphabet[key].instance.remove()
            }
        }
    }

    if (e.code == "Space") { // expand
        if (expand) {
            expand = false
            Store.params.progress = 0
    
            torus.expand(expand)
    
            if (Store.alphabetDatas.alphabetArray.length) {
                Store.alphabetDatas.alphabetArray.forEach(letter => {
                    if (letter !== null) {
                        letter.expand(expand)
                    }
                })
            }
            
            gsap.to(Store.params.pp.aip, 1, { damp: .75, esae: "Power3.easeInOut" })

            // Disable vertigo effect
            scene.noVertigoEffect()

            if (Store.alphabetDatas.alphabetArray.length) {
                Store.alphabetDatas.alphabetArray.forEach(letter => {
                    if (letter !== null) {
                        letter.noVertigoEffect()
                    }
                })
            }
        } else {
            expand = true
            Store.params.progress = 1
            
            torus.expand(expand)
            
            if (Store.alphabetDatas.alphabetArray.length) {
                Store.alphabetDatas.alphabetArray.forEach(letter => {
                    if (letter !== null) {
                        letter.expand(expand)
                    }
                })
            }
    
            gsap.to(Store.params.pp.aip, 1, { damp: .825, esae: "Power3.easeInOut" })
        }
    }
})

document.querySelector('.webgl').addEventListener('mousedown', e => {
    Store.mouseDown = true
    if (Store.params.progress) {
        scene.vertigoEffect(e.which)
    
        if (Store.alphabetDatas.alphabetArray.length) {
            Store.alphabetDatas.alphabetArray.forEach(letter => {
                if (letter !== null) {
                    letter.vertigoEffect(e.which)
                }
            })
        }    
    }
});

document.querySelector('.webgl').addEventListener('contextmenu', e => {
    e.stopPropagation()
    e.preventDefault ()
    e.cancelBubble = true;
});

document.querySelector('.webgl').addEventListener('mouseup', e => {
    Store.mouseDown = false

    scene.noVertigoEffect()

    if (Store.alphabetDatas.alphabetArray.length) {
        Store.alphabetDatas.alphabetArray.forEach(letter => {
            if (letter !== null) {
                letter.noVertigoEffect()
            }
        })
    }
});

function raf() {
    const deltaTime = scene.clock.getDelta()
    const elapsedTime = scene.clock.getElapsedTime()
    const lowestElapsedTime = elapsedTime / 11

    torus.update(elapsedTime)

    // if (Store.params.experienceStarted) {
        soundController.update()
        scene.update()
    
        scene.camera.updateProjectionMatrix();

        // console.log(Store.alphabetDatas.lettersPositions.x);

        if (Store.alphabetDatas.alphabetArray.length) {
            Store.alphabetDatas.alphabetArray.forEach(letter => {
                if (letter !== null) {
                    letter.update(elapsedTime)
                }
            })
        }
    // }

    scene.composer.render()
    
    // Update controls
    // control.controls.update()
    window.requestAnimationFrame(raf)
}

raf()