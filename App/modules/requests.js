import $ from 'jquery'
import Backbone from './backbone'
import cookies from './cookies'
import access_token from './constants/token'

export default class Requests { // the Requests class
  /* |-------------------------------------------------------------------------------------
  /* | This class is not a component. These are our requests. The Requests class is in cha-
  /* | rge of facilitating any and all communication with our server or apis.
  /* |
  /* | Though the Requests class can move around and be seen by other modules, since this
  /* | class doesn't store any data, the methods are declared static and the class never
  /* | actually has to be initialised. It can be used anywhere in the app, within any ES6
  /* | module, simply by importing it.
  /* \-------------------------------------------------------------------------------------
  *//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**////

  static login (creds, headers) { return !!headers? headers:
    headers = { Authorization: "Basic " + btoa(creds.username + ':' + creds.password) },
    $.post({ url:  '/login', headers: headers })
  }

  static upload (pqtr) {
    return $.post({ url: "_", contentType: "application/json", data: JSON.stringify(pqtr),
      headers: { Authorization: "Bearer " + cookies.get(access_token) }
    })
  }

  static loginCheck () { return cookies.get(access_token) ? true : false }

  static logout () { cookies.remove(access_token); Backbone.sessionActive = false }

  static register (creds) { return $.post({ url: "/register",
      contentType: 'application/json',
      data: JSON.stringify(creds)
    })
  }
}
