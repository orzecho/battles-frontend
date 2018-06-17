import Ember from 'ember';
import SaveModelMixin from 'battles-frontend/mixins/projects/save-model-mixin';

export default Ember.Route.extend(SaveModelMixin, {
  model: function() {
    let model = this.store.createRecord('project');
    let team = this.store.findRecord('cuser', 1).then(e => model.set('team', e.get('team')));
    return model;
  }
});
