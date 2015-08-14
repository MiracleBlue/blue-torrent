import DS from 'ember-data';

const {attr, hasMany, belongsTo} = DS;
export default DS.Model.extend({
  name: attr("string"),
  torrentFilePath: attr("string"),
  downloadPath: attr("string"),

  isActive: attr("boolean"),
  status: attr("string"),

  isErrored: attr("boolean"),
  error: attr("string"),

  size: attr("number"),
  downloaded: attr("number"),
  uploaded: attr("number"),

  seeds: attr("number"),
  peers: attr("number"),
  ratio: attr("number"),

  uploadSpeed: 123,
  downloadSpeed: 789,

  // todo: Figure out how to make an ETA calculation
  eta: function() {
    console.log("ETA currently unavailable");
    return "Unknown";
  }.property("downloadSpeed", "downloaded", "size", "isActive")
});
