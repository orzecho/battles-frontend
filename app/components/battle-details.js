import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  battleId: undefined,
  battle: undefined,
  topic: undefined,

  didReceiveAttrs() {
    this._super(...arguments);
    if(this.get('battleId') !== undefined) {
      this.get('store').findRecord('battle', this.get('battleId')).then(b => this.set('battle', b));
    }

  }
});
