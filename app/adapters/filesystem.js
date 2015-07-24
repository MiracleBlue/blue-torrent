import Ember from 'ember';
import DS from 'ember-data';

/**
 * Borrowed from https://github.com/brzpegasus/ember-nw-markdown/blob/master/app/adapters/document.js
 */
var computed = Ember.computed;
var inject   = Ember.inject;
var RSVP     = Ember.RSVP;

export default DS.Adapter.extend({
  nw: inject.service("nw"),

  fileUtil: computed.alias('nw.fileUtil'),

  async findAll(store, type, sinceToken) {
    console.log("findAll", {store, type});
    const typeKey = type.modelName;
    const files = await this.get("fileUtil").getAllFiles(typeKey);
    console.log("getAllFiles", files);

    return files;
  },

  findRecord: function(store, type, id) {
    const modelType = type.modelName,
          fileName = `${id}.json`,
          filePath = `../datastore/${modelType}/${fileName}`;

    console.log(filePath);

    var promise = this.get('fileUtil').readFile(filePath);

    return promise.then(function(data) {
      return {
        id: id,
        body: data
      };
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
    var filename = snapshot.attr('filename');
    if (!filename) {
      return RSVP.reject(new Error("Filename cannot be null."));
    }

    return this.get('fileUtil').writeFile(filename, snapshot.attr('body'));
  }
});
