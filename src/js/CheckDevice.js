import { Store } from '@js/Store'
import Tilt from '@js/MobileTilt'

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