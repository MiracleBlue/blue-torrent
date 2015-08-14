import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('blue-table/table-row', 'Integration | Component | blue table/table row', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{blue-table/table-row}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#blue-table/table-row}}
      template block text
    {{/blue-table/table-row}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
