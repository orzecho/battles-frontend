import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Team', {
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

test('visiting /teams without data', function(assert) {
  visit('/teams');

  andThen(function() {
    assert.equal(currentPath(), 'teams.index');
    assert.equal(find('#blankslate').text().trim(), 'No Teams found');
  });
});

test('visiting /teams with data', function(assert) {
  server.create('team');
  visit('/teams');

  andThen(function() {
    assert.equal(currentPath(), 'teams.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new team', function(assert) {
  visit('/teams');
  click('a:contains(New Team)');

  andThen(function() {
    assert.equal(currentPath(), 'teams.new');

    fillIn('label:contains(Name) input', 'MyString');
    fillIn('label:contains(Users) input', 'MyString');
    fillIn('label:contains(Leader) input', 'MyString');
    fillIn('label:contains(Federatedteams) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing team', function(assert) {
  server.create('team');
  visit('/teams');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'teams.edit');

    fillIn('label:contains(Name) input', 'MyString');
    fillIn('label:contains(Users) input', 'MyString');
    fillIn('label:contains(Leader) input', 'MyString');
    fillIn('label:contains(Federatedteams) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing team', function(assert) {
  server.create('team');
  visit('/teams');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'teams.show');

    assert.equal(find('p strong:contains(Name:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Users:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Leader:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Federatedteams:)').next().text(), 'MyString');
  });
});

test('delete a team', function(assert) {
  server.create('team');
  visit('/teams');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'teams.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
