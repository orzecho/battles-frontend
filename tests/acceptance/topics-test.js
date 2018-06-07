import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Topic', {
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

test('visiting /topics without data', function(assert) {
  visit('/topics');

  andThen(function() {
    assert.equal(currentPath(), 'topics.index');
    assert.equal(find('#blankslate').text().trim(), 'No Topics found');
  });
});

test('visiting /topics with data', function(assert) {
  server.create('topic');
  visit('/topics');

  andThen(function() {
    assert.equal(currentPath(), 'topics.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new topic', function(assert) {
  visit('/topics');
  click('a:contains(New Topic)');

  andThen(function() {
    assert.equal(currentPath(), 'topics.new');

    fillIn('label:contains(Value) input', 'MyString');
    fillIn('label:contains(Votes) input', 'MyString');
    fillIn('label:contains(Battles) input', 'MyString');
    fillIn('label:contains(Comments) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing topic', function(assert) {
  server.create('topic');
  visit('/topics');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'topics.edit');

    fillIn('label:contains(Value) input', 'MyString');
    fillIn('label:contains(Votes) input', 'MyString');
    fillIn('label:contains(Battles) input', 'MyString');
    fillIn('label:contains(Comments) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing topic', function(assert) {
  server.create('topic');
  visit('/topics');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'topics.show');

    assert.equal(find('p strong:contains(Value:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Votes:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Battles:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Comments:)').next().text(), 'MyString');
  });
});

test('delete a topic', function(assert) {
  server.create('topic');
  visit('/topics');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'topics.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
