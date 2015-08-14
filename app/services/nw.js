import Ember from 'ember';
import nwGui from "../nw/gui";

const get = Ember.get;

export default Ember.Service.extend(Ember.Evented, {
  fileUtil: get(window, 'process.mainModule.exports.fileUtil'),
  gui: nwGui,
  nwWindow: Ember.computed("gui.Window", function() {
    const guiWindow = this.get("gui").Window;
    if (guiWindow) {
      return guiWindow.get();
    }
  }),
  _showDevTools: function() {
    const nwWindow = this.get("nwWindow");
    if (nwWindow) {
      nwWindow.showDevTools();
    }
  }.on("init")
});
