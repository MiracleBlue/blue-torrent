import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    // Should get torrents here
    return [
      {id: 1, name: "Some torrent", seeds: 10, peers: 5}
    ];
  }
});
