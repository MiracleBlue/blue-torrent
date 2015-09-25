import Ember from 'ember';

export default Ember.Controller.extend({
  nw: Ember.inject.service(),
  webtorrent: Ember.inject.service(),
  settings: Ember.inject.service(),

  actions: {
    async addTorrentFile(filePath) {
      const readFile = this.get('nw.fileUtil.readTorrentFile');
      const file = await readFile(filePath);

      console.log(file);

      const parsedTorrent = this.get('webtorrent').parse(file);

      console.log(parsedTorrent);

      const record = this.store.createRecord('torrent', {
        name: parsedTorrent.name,
        torrentFilePath: filePath,
        downloadPath: '/some/download/location'
      });
    }
  }
});
