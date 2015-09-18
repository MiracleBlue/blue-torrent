import Ember from 'ember';

const {computed, inject} = Ember,
  {alias} = computed;

export default Ember.Service.extend({
  store: inject.service("store"),
  nw: inject.service("nw"),
  fileUtil: alias("nw.fileUtil"),
  homePath: alias("nw.fileUtil.homePath"),
  readSettingsFile() {
    return this.get("fileUtil").readSettings();
  },
  record: computed({
    async get() {
      const store = this.get("store");
      try {
        return await store.find("settings", 1);
      }
      catch (error) {
        const homePath = this.get("homePath");
        const record = await store.createRecord("settings", {
          downloadPath: `${homePath}/blue-torrent-downloads`
        });
        return record.save();
      }
    }
  }),
  apply() {
    this.get("record").save();
  },
  _setup: Ember.on("init", async function() {
    console.log("homePath", this.get("homePath"));
    console.log("readSettings", await this.readSettingsFile());
  })
});
