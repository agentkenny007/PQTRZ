import $ from 'jquery'
import React from 'react'
import access_token from './constants/token'
import cookies from './cookies'
import proxy from './constants/proxy'
import requests from './requests'

class Backbone { // the Backbone class
  /* |-------------------------------------------------------------------------------------
  /* | This is the Backbone. It is not a component, it is the "spine" that runs the app.
  /* | The Backbone is in charge of booting the app once it is mounted, and pretty much
  /* | everything else after that. It registers live event handlers and settings, and
  /* | controls the session.
  /* |
  /* | The Backbone is itself initialised before it is exported. This means that The Back-
  /* | bone can be used anywhere in the app, within any ES6 module, simply by importing it.
  /* | No matter where you call it from, the reference is always to the same Backbone ins-
  /* | ance 'app' (little app) constructed at the end of this module.
  /* |
  /* | Little app can even be called from within this class wherever 'this' takes on a dif-
  /* | ferent context (such as within closures). That's because any reference saved to the
  /* | Backbone gets attached to little app and thus can be used universally.
  /* \-------------------------------------------------------------------------------------
  *//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**////

  constructor() {
    this.refs = [] // to store DOM references
    this.sessionActive = false // to check for logged in user
    this.user = {} // the user
  }

  boot() { // to boot and run the app
    const $app = $(document), init = () => { // init function
      this.sessionActive = requests.loginCheck() // check to see if user is logged in
      console.log('Logged in: ', this.sessionActive)
    }
    this.register($app).ready(init) // register and initialise the app
  }

  getRef(id) { // to get a previously saved DOM reference
    return this.refs[id]
  }

  deserialize(datastring) { // to turn a serialised string of data into a json object
    let jso = {}, data = datastring.split('&')
    return $.each(data, (key, value) => {
      key = value.split('=')
      jso[key[0]] = decodeURIComponent(key[1])
    }), jso
  }

  determineSize(pqtr) { // to get and set the size of the pqtr as a string
    let w = Number(pqtr.width), h = Number(pqtr.height)
    return pqtr.size = (w >= 1400 || h >= 1400) ? "HD" :
      (w >= 900 || h >= 900) ? "large" : (w >= 600 || h >= 600) ? "medium" :
      (w >= 250 || h >= 250) ? "small" : "tiny", pqtr
  }

  register($interface) { // to register live event handlers on the app
    let creds = { first: "Ikenna", last: "Ugwuh", username: "KennyKen", email: "i@e.com", password: "pass" }
    return $interface
      .on('click', '.register', () => {
        requests.register(creds)
          .then(resp => {console.log('resp: ', resp)}, err => console.log("error: ", err))
      })
      .on('click', '.login', () => {
        console.log('logging in...')
        requests.login(creds)
          .then(data => this.saveSesh(data), err => console.log("error: ", err))
      })
      .on('submit', 'form', () => { return false })
      .on('submit', '.addPqtr', function(){ app.upload($(this).serialize()) })
      , $interface
  }

  saveRef(id, R) { // to save a reference to the DOM
    this.refs[id] = R
  }

  saveSesh(data) { // to save the session once a user has loggedin
    let expires = new Date()
    expires.setTime(expires.getTime() + 1000 * 60 * 60 * 24 * 7) // set the expiry date for one week from now
    cookies.set(access_token, data.access.token, { expires: expires }) // store the access token in a cookie
    this.user = data.user // set up the logged in user
    this.sessionActive = true // activate the session
    console.log("User logged in: ", this.user)
  }

  upload(pqtr) { // to upload a pqtr to the database
    pqtr = this.deserialize(pqtr) // get the object from the serialised string
    console.log("grabbing pqtr...")
    fetch(proxy + pqtr.source).then(_=>_.blob()).then(blob => { // grab a blob (the bytes) of the pqtr
      console.log("determining size...")
      const img = new Image(), // create an image
            reader = new FileReader(), // create a file reader
            upload = pqtr => requests.upload(pqtr) // define a callback to upload the pqtr
              .then(resp => {
                console.log("pqtr uploaded successfully.")
                console.log('response: ', resp)
                $('body').append($('<img>').attr("src", resp.blob)) // set the pqtr in the body (temporary)
              }, err => console.log("error: ", err)) // error uploading pqtr
      reader.readAsDataURL(blob) // turn the bytes into a base64 string of binary data
      reader.addEventListener('loadend', e => { // once the bytes have been read
        img.src = pqtr.blob = e.srcElement.result // set the result as the blob of the pqtr and the source of the image
        img.onload = () => { // once the source is set,  the image will load
          // after loading is complete, determine the natural (actual) size of the image, then upload
          pqtr.width = img.naturalWidth.toString()
          pqtr.height = img.naturalHeight.toString()
          upload(this.determineSize(pqtr))
          console.log("uploading...")
        }
        img.onerror = () => { // catch any errors resolving the image
          console.log("image error.")
        }
      })
    })
  }
}

// construct and export little app
const app = new Backbone()
export default app
