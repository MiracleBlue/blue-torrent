import Ember from 'ember';

export default Ember.Route.extend({
  webtorrent: Ember.inject.service("webtorrent"),

  model() {
    // Should get torrents here
    return this.store.findAll("torrent");
  },

  actions: {
    async addTorrent() {
      const webtorrent = this.get("webtorrent"),
            record = await this.store.find("torrent", 1);

      webtorrent.addTorrent(await record.get("torrentFile"));

      console.log("addTorrent complete I guess");
    }
  }
});
