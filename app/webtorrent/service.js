import Ember from 'ember';
import WebTorrent from "./webtorrent";
import ParseTorrent from './parse-torrent';

const {computed, inject} = Ember,
  {alias} = computed;

export default Ember.Service.extend({
  nw: inject.service("nw"),
  settings: inject.service("settings"),
  downloadPath: alias("settings.record.downloadPath"),

  parse(data) {
    return ParseTorrent(data);
  },

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
