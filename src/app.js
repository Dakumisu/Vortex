import './main.scss'

import * as THREE from 'three' // https://threejs.org/docs/
import { TweenLite, TweenMax, gsap } from 'gsap' // https://greensock.com/docs/
import howlerjs from 'howler' // https://github.com/goldfire/howler.js#documentation

import { Store } from '../static/js/Store' // Store
import Scene from '../static/js/Scene' // Création de la scène + renderer + camera
import LoadAlphabet from '../static/js/LoadAlphabet' // Chargement de l'alphabet
import Letter from '../static/js/Letter' // Ajout d'une lettre à la scène
import Mouse from '../static/js/Mouse' // Obtenir la position de la souris dans tous les environnement
import Torus from '../static/js/Torus' // Torus
import Raycaster from '../static/js/Raycaster' // Création de raycasters si besoin
import Control from '../static/js/Control' // Orbitcontrol (pour le debbugage)
import Settings from '../static/js/Settings.js' // Dat.gui (toujours pour le debbugage)

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Mobile
} else {
    // Desktop
}

// const settings = new Settings()

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

new LoadAlphabet()

const control = new Control({
    camera: scene.camera,
    renderer: scene.renderer
})

const alphabet = []

document.querySelector('.webgl').addEventListener('touchstart', e => {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.charAt(Math.floor(Math.random() * 25))
    alphabet.push(new Letter({
        scene: scene,
        mesh: Store.alphabet[letters].mesh
    }))
})

document.addEventListener('keydown', e => {
    console.log(`${e.key} touch pressed`)
    console.log(e);

    const key = e.key.toLowerCase()
    const regex = /[a-zA-Z]/
    const checkKey =  e.getModifierState(key)

    console.log(key.match(regex));

    if (key.match(regex)) {
        if (key.match(regex).input.length && key.match(regex).input.length == 1) {
            console.log(Store.alphabet[key]);
    
            alphabet.push(new Letter({
                scene: scene,
                mesh: Store.alphabet[key].mesh
            }))
        }
    }


    // if (e.key == 'a') {
    //     const newLetter = new LoadModel({
    //         name: 'alphabet_a',
    //         model: '../assets/3D/alphabet/a.glb',
    //         scene: scene,
    //     })
    //     // newLetter.add()
    //     alphabet.push(newLetter)
    // }
})

let renderPostProc = true
let expand = false
document.querySelector('.toggle').addEventListener('click', () => renderPostProc ? renderPostProc = false: renderPostProc = true )
document.querySelector('.expand').addEventListener('click', () => {
    if (expand) {
        expand = false
        torus.expand(expand)
        gsap.to(scene.composer.passes[1].uniforms.damp, 1, { value: .8, esae: "Power.easeInOut" })
    } else {
        gsap.to(scene.composer.passes[1].uniforms.damp, 1, { value: .85, esae: "Power.easeInOut" })
        expand = true
        torus.expand(expand)
    }
})
document.querySelector('.fov').addEventListener('click', () => {
    gsap.to(scene.camera, 1, { fov: 45, ease: "Power3.easeInOut" })
    gsap.to(scene.camera.position, 1, { z: 6, ease: "Power3.easeInOut" })
})

// setTimeout(() => {
//     const parole = new SpeechSynthesisUtterance()
//     const texte = "sheeeeeeeeeesh"
//     parole.text = texte
//     parole.volume = 1
//     parole.rate = .8
//     parole.lang = 'en-US'
//     speechSynthesis.speak(parole)
// }, 2000);

function raf() {
    const deltaTime = scene.clock.getDelta()
    const elapsedTime = scene.clock.getElapsedTime()
    const lowestElapsedTime = elapsedTime / 11

    torus.update(elapsedTime)

    // scene.camera.fov += (Math.sin(elapsedTime) * .7)
    scene.camera.updateProjectionMatrix();

    console.log(scene.camera.fov);
    
    // alphabet.forEach(letter => {
    //     letter.update(elapsedTime)
    // })

    renderPostProc ? scene.composer.render(): scene.renderer.render(scene.scene, scene.camera)
    
    // Update controls
    control.controls.update()
    window.requestAnimationFrame(raf)
}

raf()