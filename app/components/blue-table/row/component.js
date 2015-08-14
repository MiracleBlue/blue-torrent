import Ember from 'ember';

const {log, info, error, warn} = console;

export default Ember.Component.extend({
  positionalParams: ["row"],
  tagName: "",

  // dynamic properties
  selected: false,
  expanded: false,

  // Computed Properties
  columns: Ember.computed("childViews.[]", {
    get() {
      return this.get("childViews.@each.attrs").toArray();
    }
  }),

  // Event Handlers
  click(event) {
    console.log("click event", event);
    this.send("expand");
  },

  _debug: Ember.on("init", "click", function() {
    console.log("Hello?");
  }),

  actions: {
    expand() {
      console.log("expand");
      this.set("expanded", true);
    },
    collapse() {
      this.set("expanded", false);
    },
    select() {
      this.set("selected", true);
    },
    deselect() {
      this.set("selected", false);
    }
  }
});
