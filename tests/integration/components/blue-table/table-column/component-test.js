import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('blue-table/table-column', 'Integration | Component | blue table/table column', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{blue-table/table-column}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#blue-table/table-column}}
      template block text
    {{/blue-table/table-column}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
