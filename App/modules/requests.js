import $ from 'jquery';
import Backbone from './backbone';
import cookies from './cookies';
import access_token from './constants/token';

export default class Requests {
    static login (creds, headers) { return !!headers? headers:
      headers = { Authorization: "Basic " + btoa(creds.username + ':' + creds.password) },
      console.log(headers), $.post({ url:  '/login',
        headers: headers
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
