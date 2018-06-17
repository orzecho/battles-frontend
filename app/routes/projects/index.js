import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    remove: function(model) {
      if(confirm('Are you sure?')) {
        model.destroyRecord();
      }
    },
    updateVote: function (project, value) {
      this.get('ajax').request(`/projects/vote/${project.id}/${value}`)
        .then(() => window.location = '/projects')
        .catch(() => this.get('flashMessages').danger("Nie udało się dodać głosu. Prawdopodobnie już głosowałeś."));
    }
  },
  model: function() {
    return this.store.findAll('project');
  },

  setupController(controller) {
    this._super(...arguments);
    this.store.findRecord('cuser', 1).then(u => {
      controller.set('currentUser', u);
      if(Ember.isEmpty(u.get('team'))) {
        controller.set('newProjectDisabled', true);
      } else {
        this.set('newProjectDisabled', false);
      }
    });
  }
});
