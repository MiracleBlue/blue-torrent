import Ember from 'ember';
import WebTorrent from "./webtorrent";

const {computed, inject} = Ember,
      {alias} = computed;

export default Ember.Service.extend({
  nw: inject.service("nw"),
  downloadPath: alias("nw.fileUtil.getDownloadPath"),
  client: computed({
    get() {
      return new WebTorrent();
    }
  }),
  torrents: alias("client.torrents"),

  addTorrent(file) {
    const downloadPath = this.get("downloadPath"),
          client = this.get("client");

    console.log("addTorrent", {downloadPath, client, file});

    client.add(file, {
      path: `${downloadPath}/ubuntu`
    }, torrent => {
      console.log("onTorrent", ...arguments);
    });
  },

  getByName(name) {
    const torrents = this.get("torrents");

    return torrents.filter(torrent => torrent.name === name);
  }
});
