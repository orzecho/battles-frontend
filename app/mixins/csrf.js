import Mixin from '@ember/object/mixin';
import { inject } from '@ember/service';

export default Mixin.create({
  _ajax: inject('ajax'),

  ajaxOptions() {
    const hash = this._super(...arguments);
    return this.get('_ajax').addCsrfHeaders(hash);
  }
});
