/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const {
  computed,
  defineProperty
} = Ember;

export default Ember.Component.extend({
  classNames: ['validated-input'],
  classNameBindings: ['showErrorClass:has-error', 'isValid:has-success'],
  model: null,
  value: null,
  type: 'text',
  valuePath: '',
  validation: null,
  showValidations: false,
  didValidate: false,

  notValidating: computed.not('validation.isValidating').readOnly(),
  hasContent: computed('value', function () {
    const value = this.get('value');
    if (Ember.isEmpty(value)) {
      return false;
    } else {
      const isEmptyPromise = value.then && Ember.isEmpty(value.get('content'));
      return !isEmptyPromise;
    }
  }),
  hasWarnings: computed.notEmpty('validation.warnings').readOnly(),
  isValid: computed.and('hasContent', 'validation.isTruelyValid').readOnly(),
  shouldDisplayValidations: computed.or('showValidations', 'didValidate', 'hasContent').readOnly(),

  showErrorClass: computed.and('notValidating', 'showErrorMessage', 'hasContent', 'validation').readOnly(),
  showErrorMessage: computed.and('shouldDisplayValidations', 'validation.isInvalid').readOnly(),
  showWarningMessage: computed.and('shouldDisplayValidations', 'hasWarnings', 'isValid').readOnly(),

  init() {
    this._super(...arguments);
    const valuePath = this.get('valuePath');

    defineProperty(this, 'validation', computed.readOnly(`model.validations.attrs.${valuePath}`));
    defineProperty(this, 'value', computed.alias(`model.${valuePath}`));
  },

  focusOut() {
    this._super(...arguments);
    this.set('showValidations', true);
  }
});
