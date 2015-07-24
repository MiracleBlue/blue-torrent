import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    // Should get torrents here
    return this.store.findAll("torrent");
  }
});
