import DS from 'ember-data';

export default DS.Model.extend({
  battleUser: DS.belongsTo('battle-user'),
  content: DS.attr('string')
});
