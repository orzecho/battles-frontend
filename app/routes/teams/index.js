import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),

  actions: {
    remove: function(model) {
      if(confirm('Are you sure?')) {
        model.destroyRecord();
      }
    },
    join: function(team) {
      this.get('ajax').request('/join-team/' + team.get('id'));
      model.refresh()
    },
    leave: function(team) {
      this.get('ajax').request('/leave-team/' + team.get('id'));
      window.location = '/teams';
    }
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('currentUser', this.set('currentUser', this.store.findRecord('cuser', 1)));
  },

  model: function() {
    return this.store.findAll('team');
  }
});
