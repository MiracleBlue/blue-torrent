import DS from 'ember-data';

const {attr, hasMany, belongsTo} = DS;

export default DS.Model.extend({
  downloadPath: attr("string")
});
