import cookie from 'cookie';
import assign from 'object-assign';

class Cookies { // the Cookies class
  /* |-------------------------------------------------------------------------------------
  /* | This class is not a component. The Cookies class is in charge of getting and setting
  /* | cookies on the browser. Cookies can be used to determine things about the session,
  /* \ such as whether or not a user is logged in.
  /* |
  /* | This class is initialised before being exported and thus can be used universally, an-
  /* | ywhere in the app, within any ES6 module, simply by importing it.
  /* \-------------------------------------------------------------------------------------
  *//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**////

  get(name, options = {}) {
    const cookies = cookie.parse(document.cookie);
    return readCookie(cookies[name], options);
  }

  getAll(options = {}) {
    const cookies = cookie.parse(document.cookie), result = {};
    for (let name in cookies) result[name] = readCookie(cookies[name], options);
    return result;
  }

  set(name, value, options) {
      if (typeof value === 'object') value = JSON.stringify(value);
      document.cookie = cookie.serialize(name, value, options);
  }

  remove(name, options) {
      const finalOptions = (options = assign({
          }, options, {
              expires: new Date(1970, 1, 1, 0, 0, 1),
              maxAge: 0
          })
      );
      document.cookie = cookie.serialize(name, '', finalOptions);
  }
}

function isParsingCookie(value, doNotParse) {
    if (typeof doNotParse === 'undefined')
        doNotParse = !value || (value[0] !== '{' && value[0] !== '[');
    return !doNotParse;
}

function readCookie(value, options) {
    if (isParsingCookie(value, options.doNotParse))
        try { return JSON.parse(value); } catch (e) {};
    return value;
}

export default new Cookies();
