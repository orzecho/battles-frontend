import DS from 'ember-data';
import EmberObject, { computed } from '@ember/object';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  users: DS.hasMany('user'),
  leader: DS.belongsTo('user'),
  federatedTeams: DS.hasMany('federated-team'),

  usersWithoutDuplicates: computed('users', function() {
    let u = Ember.A();
    let ids = [];
    this.get('users').forEach(function(e) {
      if(!ids.includes(e.id)) {
        u.push(e);
        ids.push(e.id)
      }
    });
    return u;
  })
});
