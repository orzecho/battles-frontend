import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  team: DS.belongsTo('team'),
  comments: DS.hasMany('comment'),
  votes: DS.hasMany('vote'),
  tags: DS.hasMany('tag')
});
