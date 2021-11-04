import './main.scss'

import { Store } from '../static/js/Store' // Store
import Scene from '../static/js/Scene' // Création de la scène + renderer + camera
import LoadAlphabet from '../static/js/LoadAlphabet' // Chargement de l'alphabet
import Mouse from '../static/js/Mouse' // Obtenir la position de la souris dans tous les environnement
import Torus from '../static/js/Torus' // Torus x Vortex
import Hud from '../static/js/Hud'
import Controls from '../static/js/Controls'
import SoundController from '../static/js/SoundController'
import CheckDevice from '../static/js/CheckDevice'
import Settings from '../static/js/Settings.js' // Dat.gui (toujours pour le debbugage)

new CheckDevice();

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


const soundController = new SoundController({
    camera: scene.camera
})

const hud = new Hud({
    soundController: soundController
})

const controls = new Controls({
    soundController: soundController,
    scene: scene,
    mouse: mouse,
    torus: torus
})

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
    // scene.renderer.render(scene.scene, scene.camera)

    window.requestAnimationFrame(raf)
}

raf()