import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    remove: function(model) {
      if(confirm('Are you sure?')) {
        model.destroyRecord();
      }
    }
  },
  model: function() {
    this.store.findAll('team');
    this.store.findAll('topic');
    this.store.findAll('project');
    this.store.findAll('timetable');
    return this.store.findAll('battle');
  }
});
