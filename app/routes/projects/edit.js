import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    let project = this.get('store').findRecord('project', params.id).then(p => {p.set('name','Zmiana'); p.save(); return p;});
    return project;
  }
});
