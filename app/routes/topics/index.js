import Route from '@ember/routing/route';
import $ from 'jquery';
import { inject as service } from '@ember/service';

export default Route.extend({
  ajax: service(),
  flashMessages: service(),

  actions: {
    remove: function (model) {
      model.destroyRecord();
    },
    vote: function (model) {
      $('#exampleModalCenter').modal('toggle');
    },
    updateVote: function (topic, value) {
      this.get('ajax').request(`/topics/vote/${topic.id}/${value}`)
        .then(() => window.location = '/topics')
        .catch(() => this.get('flashMessages').danger("Nie udało się dodać głosu. Prawdopodobnie już głosowałeś."));
    }
  },

  model: function() {
    return this.store.findAll('topic');
  }
});
