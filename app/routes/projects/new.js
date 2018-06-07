import Ember from 'ember';
import SaveModelMixin from 'battles-frontend/mixins/projects/save-model-mixin';

export default Ember.Route.extend(SaveModelMixin, {
  model: function() {
    return this.store.createRecord('project');
  }
});
