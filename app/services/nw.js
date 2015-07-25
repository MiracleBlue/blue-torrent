import Ember from 'ember';
import nwGui from "../nw/gui";

const get = Ember.get;

export default Ember.Service.extend(Ember.Evented, {
  fileUtil: get(window, 'process.mainModule.exports.fileUtil'),
  gui: nwGui,
  nwWindow: Ember.computed("gui.Window", function() {
    return this.get("gui").Window.get();
  }),
  _showDevTools: function() {
    this.get("nwWindow").showDevTools();
  }.on("init")
});
