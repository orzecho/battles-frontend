import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('projects', function() {
    this.route('edit', {path: '/edit/:id'});
    this.route('add', {path: '/add'});
  });
  this.route('teams', function() {
    this.route('add');
    this.route('edit');
  });
  this.route('about');
  this.route('battles', function() {
    this.route('add');
    this.route('edit');
  });
  this.route('topics', function() {
    this.route('add');
    this.route('edit');
  });
});

export default Router;
