import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | topics/add', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:topics/add');
    assert.ok(route);
  });
});
