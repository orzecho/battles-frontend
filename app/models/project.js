import DS from 'ember-data';
import { computed } from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence',  {
    presence: true,
    message: 'Projekt musi mieć nazwę!'
  })
});

export default DS.Model.extend(Validations, {
  name: DS.attr('string'),
  description: DS.attr('string'),
  team: DS.belongsTo('team'),
  battle: DS.belongsTo('battle'),
  comments: DS.hasMany('comment'),
  votes: DS.hasMany('vote'),
  tags: DS.hasMany('tag'),
  songProject: DS.belongsTo('song-project'),
  dubbingProject: DS.belongsTo('song-project'),
  otherProject: DS.belongsTo('other-project'),

  teamName: computed('team', function() {
    return this.get('team').get('name');
  })
});
