import Ember from 'ember';

export default Ember.Component.extend({
  filePath: "",

  actions: {
    triggerFileSelect() {
      const input = this.$(".file-select__input");
      input.click();
    },
    fileSelected() {
      console.log("file selected", ...arguments);
      const filePath = this.get("filePath"),
            inputValue = this.$('input').val();

      console.log(inputValue);

      this.set('filePath', inputValue);

      this.sendAction('select', inputValue);
    }
  }
});
