import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "",

  key: null,
  name: null,

  _setupDataComputed: Ember.on("init", function() {
    const key = this.get("key");

    this.set("data", Ember.computed(`parentView.controller.row.${key}`, {
      get() {
        return this.get(`parentView.controller.row.${key}`);
      }
    }))
  }),

  data: null
});
