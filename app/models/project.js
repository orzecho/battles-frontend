import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  team: DS.belongsTo('team'),
  battle: DS.belongsTo('battle'),
  comments: DS.hasMany('comment'),
  votes: DS.hasMany('vote'),
  tags: DS.hasMany('tag'),
  songProject: DS.belongsTo('song-project'),
  dubbingProject: DS.belongsTo('song-project'),
  otherProject: DS.belongsTo('other-project')
});
