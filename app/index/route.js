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
    async addTorrent() {
      const webtorrent = this.get("webtorrent"),
        record = await this.store.find("torrent", 1);

      webtorrent.addTorrent(await record.get("torrentFile"));

      record.set("isActive", true);

      console.log("addTorrent complete I guess");
    },
    select(filePath) {

    }
  }
});
