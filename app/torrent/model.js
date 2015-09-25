import DS from 'ember-data';
import filesize from "../utils/filesize";

const {attr, hasMany, belongsTo} = DS;

export default DS.Model.extend({
  webtorrent:       Ember.inject.service("webtorrent"),
  nw:               Ember.inject.service("nw"),

  name: attr("string"),
  torrentFilePath: attr("string"),
  downloadPath: attr("string"),

  isActive: attr("boolean"),
  status: attr("string"),

  isErrored: attr("boolean"),
  error: attr("string"),

  size: attr("number"),
  downloaded: attr("number"),
  uploaded: attr("number"),

  seeds: attr("number"),
  peers: attr("number"),
  ratio: attr("number"),

  uploadSpeed: 123,
  downloadSpeed: "0 bytes/s",

  // todo: Figure out how to make an ETA calculation
  eta: function() {
    console.log("ETA currently unavailable");
    return "Unknown";
  }.property("downloadSpeed", "downloaded", "size", "isActive"),

  torrentItem: Ember.computed("webtorrent", "torrentFile", {
    async get() {
      const torrentFile = await this.get("torrentFile");
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

  _setupListener: Ember.on("init", function() {
    console.log("Hello");
  }),

  _observeActiveMeta: Ember.observer("isActive", async function() {
    console.log("isActive");
    const torrentItem = await this.get("torrentItem");
    const logDownloadSpeed = () => this.set("downloadSpeed", torrentItem.swarm.downloadSpeed()::filesize() + "/s");

    torrentItem.swarm.on("download", metadata => {
      Ember.run.throttle(this, logDownloadSpeed, 300);
    });
  }),

  async start() {
    const webtorrent = this.get("webtorrent");

    webtorrent.addTorrent(await this.get("torrentFile"));

    this.set("isActive", true);
  }
});
