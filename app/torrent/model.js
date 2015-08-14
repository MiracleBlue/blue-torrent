import DS from 'ember-data';

export default DS.Model.extend({
  webtorrent:       Ember.inject.service("webtorrent"),
  nw:               Ember.inject.service("nw"),

  name:             DS.attr("string"),
  torrentFilePath:  DS.attr("string"),

  torrentItem: Ember.computed("webtorrent", "torrentFile", {
    get() {
      const torrentFile = this.get("torrentFile");
      return this.get("webtorrent.client").get(torrentFile);
    }
  }),
  torrentFile: Ember.computed({
    get() {
      const fileUtil = this.get("nw.fileUtil"),
            torrentFilePath = this.get("torrentFilePath");

      return fileUtil.readTorrentFile(torrentFilePath);
    }
  }),
  _debug: Ember.on("init", function() {
    console.log("torrent", this);
  })
});
