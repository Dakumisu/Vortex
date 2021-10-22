import * as dat from "dat.gui"; // https://github.com/dataarts/dat.gui#readme

class Settings {
   constructor() {
      this.gui = new dat.GUI()
      this.settings = {
      }
      this.gui.closed = true;
   }
}

export default Settings