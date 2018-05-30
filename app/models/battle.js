import DS from 'ember-data';

export default DS.Model.extend({
  teams: DS.hasMany('team'),
  projects: DS.hasMany('project'),
  topic: DS.belongsTo('topic'),
  votes: DS.hasMany('vote'),
  comments: DS.hasMany('comment'),
  tags: DS.hasMany('tag'),
  battleStatus: DS.attr('string'),
  timetable: DS.belongsTo('timetable')
});
