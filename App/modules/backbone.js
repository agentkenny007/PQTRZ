import $ from 'jquery';
import React from 'react';
import access_token from './constants/token';
import cookies from './cookies';
import requests from './requests';

class Backbone { // the Backbone class
  /* |-------------------------------------------------------------------------------------
  /* | This is the Backbone. It is not a component, it is the "spine" that runs the app.
  /* | The Backbone is in charge of booting the app once it is mounted, and pretty much
  /* | everything else after that. It registers live event handlers and settings, and
  /* | controls the session.
  /* |
  /* | The Backbone is itself initialised before it is exported. This means that The Back-
  /* | bone can be use anywhere in the app, within any ES6 module, simply by importing it.
  /* | No matter where you call it from, the reference is always to the same Backbone ins-
  /* | ance 'bone' (little bone) constructed at the end of this module.
  /* |
  /* | Little bone can even be called from within this module to control things like apply-
  /* | ing settings and live DOM insertion. That's because any reference saved to the Back-
  /* | bone gets attached to little bone. Essentially, little bone runs the app.
  /* \-------------------------------------------------------------------------------------
  *//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**////

  constructor() {
    this.refs = []; // to store DOM references
    this.sessionActive = false; // to check for logged in user
    this.user = {}; // the user
  }

  boot() { // to boot and run the app
    let init = () => { // init function
      this.sessionActive = requests.loginCheck() // check to see if user is logged in
      console.log('Logged in: ', this.sessionActive);
    };

    $(document) // register live event handlers (use jquery)
      .ready(init); // when the document is ready, init

    $(window).resize(() => { // when the window is resized

    });
  }

  getRef(id) { // to get a previously saved DOM reference
    return this.refs[id];
  }

  saveRef(id, R) { // to save a reference to the DOM
    this.refs[id] = R;
  }

  saveSesh(data) { // to save the session once a user has loggedin
    let expires = new Date();
    expires.setTime(expires.getTime() + 1000 * 60 * 60 * 24 * 7); // set the expiry date for one week from now
    this.sessionActive = true; // activate the session
    console.log(expires)
    cookies.set(access_token, data.access_token, { expires: expires }) // store the access token in a cookie
    delete data.access_token; // remove the access token from the response
    this.user = data; // set up the logged in user
    console.log(this.user)
  }
};

// construct and export little bone
const bone = new Backbone();
export default bone;
