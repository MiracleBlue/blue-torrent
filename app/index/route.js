import Ember from 'ember';

export default Ember.Route.extend({
  webtorrent: Ember.inject.service("webtorrent"),
  settings: Ember.inject.service("settings"),

  _debug: Ember.on("init", function() {
    console.log(this.get("settings"));
  }),

  model() {
    // Should get torrents here
    return this.store.findAll("torrent");
  },

  actions: {
    addTorrent(torrentRecord) {
      const record = torrentRecord;
      record.start();
    }
  }
});
