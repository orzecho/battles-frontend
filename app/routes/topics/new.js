import Ember from 'ember';
import SaveModelMixin from 'battles-frontend/mixins/topics/save-model-mixin';

export default Ember.Route.extend(SaveModelMixin, {
  model: function() {
    return this.store.createRecord('topic');
  }
});
