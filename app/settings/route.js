import Ember from 'ember';

export default Ember.Route.extend({
  settings: Ember.inject.service("settings"),

  model() {
    return this.get("settings.record");
  }
});
