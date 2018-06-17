import Ember from 'ember';
import { inject as service } from '@ember/service';

export default Ember.Mixin.create({
  flashMessages: service(),

  actions: {
    save: function() {
      var route = this;
      this.currentModel.save().then(function() {
        route.transitionTo('projects');
      }, function() {
        console.log('Failed to save the model');
      });
    },

    willTransition() {
      this._super(...arguments);
      const record = this.controller.get('model');
      record.rollbackAttributes();
    },

    selectBattle(value, option) {
      this.model.set('battle', value);
      debugger;
    }
  },

  setupController(controller) {
    this._super(...arguments);
    this.store.query('battle', {onlyOwned: true}).then(ownedBattles => {
      if(Ember.isEmpty(ownedBattles)) {
        this.get('flashMessages').danger("Brak dostępnych bitew.");
        this.set('saveDisabled', true);
      } else {
        this.set('saveDisabled', false);
      }

      let availableBattles = [];
      ownedBattles.forEach(battle => {
        this.store.findRecord('topic', parseInt(battle.get('topic.id'))).then(t => {
          availableBattles.push({topic: t.get('value'), battle: battle});
          controller.set('availableBattles', availableBattles);
          controller.set('selectedBattleOption', {topic: {topic: t.get('value'), battle: battle}})
        });
      });
    });

    controller.set('currentUser', this.store.findRecord('cuser', 1));
  }

});
