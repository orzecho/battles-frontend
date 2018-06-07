import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('projects', function() {
    this.route('new');

    this.route('edit', {
      path: ':project_id/edit'
    });

    this.route('show', {
      path: ':project_id'
    });
  });
  this.route('battles', function() {
    this.route('show', {
      path: ':battle_id'
    });
  });
  this.route('teams', function() {
    this.route('new');

    this.route('edit', {
      path: ':team_id/edit'
    });

    this.route('show', {
      path: ':team_id'
    });
  });
  this.route('tags', function() {
    this.route('new');

    this.route('edit', {
      path: ':tag_id/edit'
    });

    this.route('show', {
      path: ':tag_id'
    });
  });
  this.route('topics', function() {
    this.route('new');

    this.route('edit', {
      path: ':topic_id/edit'
    });

    this.route('show', {
      path: ':topic_id'
    });
  });
});

export default Router;
