import './main.scss'

import * as THREE from 'three' // https://threejs.org/docs/
import { BloomEffect, EffectComposer, ShaderPass, EffectPass, RenderPass } from "postprocessing" // https://threejs.org/docs/?q=pro#manual/en/introduction/How-to-use-post-processing
import { TweenLite, TweenMax, gsap } from 'gsap' // https://greensock.com/docs/
import howlerjs from 'howler' // https://github.com/goldfire/howler.js#documentation

import Scene from '../static/js/Scene' // Création de la scène + renderer + camera
import LoadModel from '../static/js/LoadModel' // Chargement d'un modèle 3D
import Mouse from '../static/js/Mouse' // Obtenir la position de la souris dans tous les environnement
import Blueprint from '../static/js/Blueprint' // Template de plane
import Torus from '../static/js/Torus' // Torus
import Raycaster from '../static/js/Raycaster' // Création de raycasters si besoin
import Control from '../static/js/Control' // Orbitcontrol (pour le debbugage)
import Settings from '../static/js/Settings.js' // Dat.gui (toujours pour le debbugage)

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Mobile
} else {
    // Desktop
}

const settings = new Settings()

const scene = new Scene({
    canvas: document.querySelector('.webgl'),
    settings: settings.settings
})

const torus = new Torus({
    scene: scene,
})

const mouse = new Mouse({
    scene: scene
})

const control = new Control({
    camera: scene.camera,
    renderer: scene.renderer
})


document.addEventListener('keydown', e => {
    console.log(`${e.key} touch pressed`)
})

let renderPostProc = false
let sheeesh = false
document.querySelector('.toggle').addEventListener('click', () => renderPostProc ? renderPostProc = false: renderPostProc = true )
document.querySelector('.sheeesh').addEventListener('click', () => {
    if (sheeesh) {
        sheeesh = false
        torus.expand(sheeesh)
    } else {
        sheeesh = true
        torus.expand(sheeesh)
    }
})


function raf() {
    const deltaTime = scene.clock.getDelta()
    const elapsedTime = scene.clock.getElapsedTime()
    const lowestElapsedTime = elapsedTime / 11

    torus.update(elapsedTime)

    renderPostProc ? scene.composer.render(): scene.renderer.render(scene.scene, scene.camera)
    
    // Update controls
    control.controls.update()
    window.requestAnimationFrame(raf)
}

raf()