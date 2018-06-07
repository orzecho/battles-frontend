import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Tag', {
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

test('visiting /tags without data', function(assert) {
  visit('/tags');

  andThen(function() {
    assert.equal(currentPath(), 'tags.index');
    assert.equal(find('#blankslate').text().trim(), 'No Tags found');
  });
});

test('visiting /tags with data', function(assert) {
  server.create('tag');
  visit('/tags');

  andThen(function() {
    assert.equal(currentPath(), 'tags.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new tag', function(assert) {
  visit('/tags');
  click('a:contains(New Tag)');

  andThen(function() {
    assert.equal(currentPath(), 'tags.new');

    fillIn('label:contains(Name) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing tag', function(assert) {
  server.create('tag');
  visit('/tags');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'tags.edit');

    fillIn('label:contains(Name) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing tag', function(assert) {
  server.create('tag');
  visit('/tags');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'tags.show');

    assert.equal(find('p strong:contains(Name:)').next().text(), 'MyString');
  });
});

test('delete a tag', function(assert) {
  server.create('tag');
  visit('/tags');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'tags.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
