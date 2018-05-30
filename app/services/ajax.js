import { isPresent } from '@ember/utils'
import AjaxService from 'ember-ajax/services/ajax';

export const CSRF_COOKIE_NAME = 'XSRF-TOKEN';
export const CSRF_HEADER_NAME = 'X-XSRF-TOKEN';

export default AjaxService.extend({
  addCsrfHeaders(hash) {
    if (hash.type && ['GET', 'HEAD', 'TRACE', 'OPTIONS'].indexOf(hash.type.toUpperCase()) !== -1) {
      return hash;
    }
    const superBeforeSend = hash.beforeSend;
    hash.beforeSend = function (xhr) {
      if (superBeforeSend) {
        superBeforeSend(xhr);
      }
      const cookie = getCookie(CSRF_COOKIE_NAME);
      if (isPresent(cookie)) {
        xhr.setRequestHeader(CSRF_HEADER_NAME, cookie);
      }
    };

    return hash;
  },

  options() {
    const hash = this._super(...arguments);
    return this.addCsrfHeaders(hash);
  }
});


function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
  return undefined;
}
