import { Store } from '@js/Store'

class CheckDevice {
   constructor() {

      this.checkDevice()
      this.checkNavigator()
   }

   checkDevice() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
         // Mobile
         Store.params.events.eventClick = "touchstart"
         Store.params.events.eventMove = "touchmove"
         Store.mobile.isOnMobile = true
         
         Store.sound.strength = 2

         document.children[0].classList.add('mobile')
         
         // document.body.requestFullscreen();

         
         // new Tilt()
      } else {
         // Desktop
     }
   }

   checkNavigator() {
      // console.log(navigator);
      // console.log(navigator.language);
   }
}

const out = new CheckDevice()
export default out