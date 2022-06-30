console.log(
  `%c   Gobelins' Workshop - Sound Experience 🎵   `,
  `background: #000; padding: 5px; font-size: 12px; color: #fff`
);
console.log(
  `%c   Made by @Dakumisu - https://github.com/Dakumisu 🦍  `,
  `background: #000; padding: 5px; font-size: 12px; color: #fff`
);

import "./main.scss";

import { Store } from "@js/Store"; // Store
import Scene from "@js/Scene"; // Création de la scène + renderer + camera
import LoadAlphabet from "@js/LoadAlphabet"; // Chargement de l'alphabet
import Mouse from "@js/Mouse"; // Obtenir la position de la souris dans tous les environnement
import Torus from "@js/Torus"; // Torus x Vortex
import Hud from "@js/Hud";
import Controls from "@js/Controls";
import Control from "@js/Control";
import SoundController from "@js/SoundController";
import CheckDevice from "@js/CheckDevice";
import Tilt from "@js/MobileTilt";

let tilt = null;
if (Store.mobile.isOnMobile) {
  tilt = new Tilt();
}

new LoadAlphabet();

document.body.addEventListener("touchstart", () => {
  document.body.requestFullscreen();
});

function raf() {
  const elapsedTime = Scene.clock.getElapsedTime();
  const lowestElapsedTime = elapsedTime / 11;

  Torus.update(elapsedTime);

  // if (Store.params.experienceStarted) {
  SoundController.update();
  Scene.render();

  if (Store.alphabetDatas.alphabetArray.length) {
    Store.alphabetDatas.alphabetArray.forEach((letter) => {
      if (letter !== null) {
        letter.update(elapsedTime);
      }
    });
  }
  // }

  window.requestAnimationFrame(raf);
}

raf();
