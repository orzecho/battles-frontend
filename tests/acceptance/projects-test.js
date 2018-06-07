import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Project', {
  beforeEach: function() {
    application = startApp();
    originalConfirm = window.confirm;
    window.confirm = function() {
      confirmCalledWith = [].slice.call(arguments);
      return true;
    };
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
    window.confirm = originalConfirm;
    confirmCalledWith = null;
  }
});

test('visiting /projects without data', function(assert) {
  visit('/projects');

  andThen(function() {
    assert.equal(currentPath(), 'projects.index');
    assert.equal(find('#blankslate').text().trim(), 'No Projects found');
  });
});

test('visiting /projects with data', function(assert) {
  server.create('project');
  visit('/projects');

  andThen(function() {
    assert.equal(currentPath(), 'projects.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new project', function(assert) {
  visit('/projects');
  click('a:contains(New Project)');

  andThen(function() {
    assert.equal(currentPath(), 'projects.new');

    fillIn('label:contains(Name) input', 'MyString');
    fillIn('label:contains(Team) input', 'MyString');
    fillIn('label:contains(Comments) input', 'MyString');
    fillIn('label:contains(Votes) input', 'MyString');
    fillIn('label:contains(Tags) input', 'MyString');
    fillIn('label:contains(Songproject) input', 'MyString');
    fillIn('label:contains(Dubbingproject) input', 'MyString');
    fillIn('label:contains(Otherproject) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing project', function(assert) {
  server.create('project');
  visit('/projects');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'projects.edit');

    fillIn('label:contains(Name) input', 'MyString');
    fillIn('label:contains(Team) input', 'MyString');
    fillIn('label:contains(Comments) input', 'MyString');
    fillIn('label:contains(Votes) input', 'MyString');
    fillIn('label:contains(Tags) input', 'MyString');
    fillIn('label:contains(Songproject) input', 'MyString');
    fillIn('label:contains(Dubbingproject) input', 'MyString');
    fillIn('label:contains(Otherproject) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing project', function(assert) {
  server.create('project');
  visit('/projects');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'projects.show');

    assert.equal(find('p strong:contains(Name:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Team:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Comments:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Votes:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Tags:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Songproject:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Dubbingproject:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Otherproject:)').next().text(), 'MyString');
  });
});

test('delete a project', function(assert) {
  server.create('project');
  visit('/projects');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'projects.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
