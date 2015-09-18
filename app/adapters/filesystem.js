import Ember from 'ember';
import DS from 'ember-data';

/**
 * Borrowed from https://github.com/brzpegasus/ember-nw-markdown/blob/master/app/adapters/document.js
 */
var computed = Ember.computed;
var inject   = Ember.inject;
var RSVP     = Ember.RSVP;

// todo: clean this whole thing up to make more pretty
export default DS.Adapter.extend({
  nw: inject.service("nw"),

  fileUtil: computed.alias('nw.fileUtil'),

  async findAll(store, type, sinceToken) {
    const typeKey = type.modelName,
          files = await this.get("fileUtil").getAllFiles(typeKey);

    return files;
  },

  findRecord: function(store, type, id) {
    const typeKey = type.modelName,
          fileName = `${id}.json`,
          filePath = `../datastore/${typeKey}/${fileName}`;

    var promise = this.get('fileUtil').readFile(filePath);

    return promise.then(function(data) {
      return data[typeKey];
    });
  },

  createRecord: function(store, type, snapshot) {
    var promise = this.saveRecord(snapshot);

    return promise.catch(function(error) {
      snapshot.record.set('filename', null);
      return RSVP.reject(error);
    });
  },

  updateRecord: function(store, type, snapshot) {
    return this.saveRecord(snapshot);
  },

  saveRecord: function(snapshot) {
    console.log("snapshot", snapshot.serialize());
    const modelName = snapshot.modelName,
          record = snapshot.serialize();

    return this.get('fileUtil').createRecord(modelName, record);
  }

  // todo: make a delete record that is safe-ish
});
