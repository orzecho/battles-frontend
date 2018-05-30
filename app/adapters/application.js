import DS from 'ember-data';
import csrfMixin from '../mixins/csrf'


export default DS.RESTAdapter.extend(csrfMixin, {
  // host: 'http://localhost:8080'
});
