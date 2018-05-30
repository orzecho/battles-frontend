import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | teams/edit', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:teams/edit');
    assert.ok(route);
  });
});
