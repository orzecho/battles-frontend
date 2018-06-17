import DS from 'ember-data';

export default DS.Model.extend({
  login: DS.attr('string'),
  team: DS.belongsTo('team', { inverse: 'battleUsers'})
});
