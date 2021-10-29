import { Store } from './Store'
import Tilt from './MobileTilt'

class CheckDevice {
   constructor() {

      this.checkDevice()
      this.checkNavigator()
   }

   checkDevice() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
         // Mobile
         Store.params.events.eventClick = "touchstart"
         Store.params.events.eventDown = "touchstart"
         Store.params.events.eventUp = "touchend"
         Store.params.events.eventMove = "touchmove"
         Store.mobile.isOnMobile = true
     
         new Tilt()
     } else {
         // Desktop
         if (typeof window.ethereum.autoRefreshOnNetworkChange !== "undefined") {
             window.ethereum.autoRefreshOnNetworkChange = false;
         }
     }
   }

   checkNavigator() {
      console.log(navigator);
   }
}

export default CheckDevice