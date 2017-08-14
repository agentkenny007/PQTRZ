import $ from 'jquery';
import Backbone from './backbone';
import cookies from './cookies';
import SERVER from './constants/server';
import access_token from './constants/token';

class Requests {
    login (creds) { return $.post(SERVER.URL + 'login', creds) }

    loginCheck () { return cookies.get(access_token) ? true : false }

    logout () { cookies.remove(access_token); Backbone.sessionActive = false }

    register (creds) { return $.post(SERVER.URL + 'register', creds) }

    snatch (data) {
        let token = cookies.get(access_token),
            headers =  { Authorization: 'Bearer ' + token };

        return $.ajax({
            type: 'POST',
            headers: headers,
            url: SERVER.URL + 'songs',
            data: data, processData: false, contentType: false,
        });
    }
}

export default new Requests();
