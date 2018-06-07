import DS from 'ember-data';

export default DS.Model.extend({
  value: DS.attr('string'),
  numberOfVotes: DS.attr('number'),
  meanVote: DS.attr('number'),
  battles: DS.hasMany('battle'),
  comments: DS.hasMany('comment')
});
