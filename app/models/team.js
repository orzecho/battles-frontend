import DS from 'ember-data';
import EmberObject, { computed } from '@ember/object';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  battleUsers: DS.hasMany('battle-user'),
  leader: DS.belongsTo('battle-user'),
  federatedTeams: DS.hasMany('federated-team'),

  usersWithoutDuplicates: computed('battleUsers', function() {
    let u = Ember.A();
    let ids = [];
    this.get('battleUsers').forEach(function(e) {
      if(!ids.includes(e.id)) {
        u.push(e);
        ids.push(e.id)
      }
    });
    return u;
  })
});
