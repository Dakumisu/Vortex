import './main.scss'

import { Store } from '@js/Store' // Store
import Scene from '@js/Scene' // Création de la scène + renderer + camera
import LoadAlphabet from '@js/LoadAlphabet' // Chargement de l'alphabet
import Mouse from '@js/Mouse' // Obtenir la position de la souris dans tous les environnement
import Torus from '@js/Torus' // Torus x Vortex
import Hud from '@js/Hud'
import Controls from '@js/Controls'
import Control from '@js/Control'
import SoundController from '@js/SoundController'
import CheckDevice from '@js/CheckDevice'
// import Settings from '@js/Settings.js' // Dat.gui (toujours pour le debbugage)
import Tilt from '@js/MobileTilt'

// new CheckDevice();

let tilt = null
if (Store.mobile.isOnMobile) {
    tilt = new Tilt()
}

// const canvas = 
// const scene = new Scene({
//     canvas: canvas,
// })

new LoadAlphabet()

// const mouse = new Mouse()

// const torus = new Torus()

// const soundController = new SoundController()

// const hud = new Hud()

// const controls = new Controls()

// const orbitControl = new Control({
//     camera: scene.camera,
//     renderer: scene.renderer
// })

function raf() {
    const elapsedTime = Scene.clock.getElapsedTime()
    const lowestElapsedTime = elapsedTime / 11

    Torus.update(elapsedTime)

    // if (Store.params.experienceStarted) {
        SoundController.update()
        Scene.render()
    
        if (Store.alphabetDatas.alphabetArray.length) {
            Store.alphabetDatas.alphabetArray.forEach(letter => {
                if (letter !== null) {
                    letter.update(elapsedTime)
                }
            })
        }
    // }

    // scene.composer.render()
    // orbitControl.controls.update()

    window.requestAnimationFrame(raf)
}

raf()