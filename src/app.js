import './main.scss'

import { Store } from '../static/js/Store' // Store
import Scene from '../static/js/Scene' // Création de la scène + renderer + camera
import LoadAlphabet from '../static/js/LoadAlphabet' // Chargement de l'alphabet
import Mouse from '../static/js/Mouse' // Obtenir la position de la souris dans tous les environnement
import Torus from '../static/js/Torus' // Torus x Vortex
import Hud from '../static/js/Hud'
import Controls from '../static/js/Controls'
import Control from '../static/js/Control'
import SoundController from '../static/js/SoundController'
import CheckDevice from '../static/js/CheckDevice'
import Settings from '../static/js/Settings.js' // Dat.gui (toujours pour le debbugage)
import Tilt from '../static/js/MobileTilt'

new CheckDevice();

let tilt = null
if (Store.mobile.isOnMobile) {
    tilt = new Tilt()
}

const canvas = document.querySelector('.webgl')

const scene = new Scene({
    canvas: canvas,
})

new LoadAlphabet({
    scene: scene.scene
})

const mouse = new Mouse({
    scene: scene
})

const torus = new Torus({
    scene: scene,
    mouse: mouse.mouseScene
})


const soundController = new SoundController()

const hud = new Hud({
    soundController: soundController
})

const controls = new Controls({
    soundController: soundController,
    scene: scene,
    mouse: mouse,
    torus: torus
})

// const orbitControl = new Control({
//     camera: scene.camera,
//     renderer: scene.renderer
// })

function raf() {
    const elapsedTime = scene.clock.getElapsedTime()
    const lowestElapsedTime = elapsedTime / 11

    torus.update(elapsedTime)

    // if (Store.params.experienceStarted) {
        soundController.update()
        scene.update()
    
        if (Store.alphabetDatas.alphabetArray.length) {
            Store.alphabetDatas.alphabetArray.forEach(letter => {
                if (letter !== null) {
                    letter.update(elapsedTime)
                }
            })
        }
    // }

    scene.composer.render()
    // orbitControl.controls.update()

    window.requestAnimationFrame(raf)
}

raf()