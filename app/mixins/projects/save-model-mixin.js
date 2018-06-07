import Ember from 'ember';

export default Ember.Mixin.create({
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
  },

  setupController(controller) {
    this._super(...arguments);
    let ownedBattles = this.store.query('battle', {onlyOwned: true});
    let availableBattles = [];
    ownedBattles.forEach(battle => {
      availableBattles.push({label: battle.topic, value: battle});
    });
    controller.set('availableBattles', availableBattles);
    controller.set('currentUser', this.set('currentUser', this.store.findRecord('cuser', 1)));
  },

});
