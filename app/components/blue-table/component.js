import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ["blue-table"],
  columns: Ember.A(),
  _populateColumns: Ember.on("didInsertElement", function() {
    const columns = this.get("childViews.firstObject.columns");
    Ember.run.next(() => this.set("columns", columns));
  })
}).reopenClass({
  positionalParams: ["content"]
});
