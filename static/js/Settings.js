import * as dat from "dat.gui"; // https://github.com/dataarts/dat.gui#readme

class Settings {
   constructor() {
      this.gui = new dat.GUI()
      this.settings = {
         exposure: 1,
         bloomStrength: .8,
         bloomThreshold: 0,
         bloomRadius: 0,
      }
      this.gui.add(this.settings, "exposure", 0, 2, 0.01)
      this.gui.add(this.settings, "bloomStrength", 0, 1, 0.01)
      this.gui.add(this.settings, "bloomThreshold", 0, 3, 0.01)
      this.gui.add(this.settings, "bloomRadius", 0, 1, 0.01)
      this.gui.closed = true;
   }
}

export default Settings