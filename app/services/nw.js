import Ember from 'ember';
import nwGui from "../nw/gui";

var get = Ember.get;

export default Ember.Service.extend(Ember.Evented, {
  fileUtil: get(window, 'process.mainModule.exports.fileUtil'),
  gui: nwGui
});
