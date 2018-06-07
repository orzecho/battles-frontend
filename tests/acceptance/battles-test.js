import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Battle', {
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

test('visiting /battles without data', function(assert) {
  visit('/battles');

  andThen(function() {
    assert.equal(currentPath(), 'battles.index');
    assert.equal(find('#blankslate').text().trim(), 'No Battles found');
  });
});

test('visiting /battles with data', function(assert) {
  server.create('battle');
  visit('/battles');

  andThen(function() {
    assert.equal(currentPath(), 'battles.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new battle', function(assert) {
  visit('/battles');
  click('a:contains(New Battle)');

  andThen(function() {
    assert.equal(currentPath(), 'battles.new');

    fillIn('label:contains(Teams) input', 'MyString');
    fillIn('label:contains(Projects) input', 'MyString');
    fillIn('label:contains(Topic) input', 'MyString');
    fillIn('label:contains(Votes) input', 'MyString');
    fillIn('label:contains(Comments) input', 'MyString');
    fillIn('label:contains(Tags) input', 'MyString');
    fillIn('label:contains(Battlestatus) input', 'MyString');
    fillIn('label:contains(Timetable) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing battle', function(assert) {
  server.create('battle');
  visit('/battles');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'battles.edit');

    fillIn('label:contains(Teams) input', 'MyString');
    fillIn('label:contains(Projects) input', 'MyString');
    fillIn('label:contains(Topic) input', 'MyString');
    fillIn('label:contains(Votes) input', 'MyString');
    fillIn('label:contains(Comments) input', 'MyString');
    fillIn('label:contains(Tags) input', 'MyString');
    fillIn('label:contains(Battlestatus) input', 'MyString');
    fillIn('label:contains(Timetable) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing battle', function(assert) {
  server.create('battle');
  visit('/battles');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'battles.show');

    assert.equal(find('p strong:contains(Teams:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Projects:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Topic:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Votes:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Comments:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Tags:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Battlestatus:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Timetable:)').next().text(), 'MyString');
  });
});

test('delete a battle', function(assert) {
  server.create('battle');
  visit('/battles');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'battles.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
