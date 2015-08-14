import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "",

  key: null,
  name: null,

  data: Ember.computed("parentView.controller.row", {
    get() {
      const key = this.get("key");
      return this.get(`parentView.controller.row.${key}`);
    }
  })
});
