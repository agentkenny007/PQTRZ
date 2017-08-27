import Backbone from './modules/backbone'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import './index.scss'
import TransitionGroup from 'react-transition-group/TransitionGroup'

import Home from './components/home'
import Single from './components/single'
import HeaderForms from './components/forms'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { active: false } // set initial state
    console.log("router is: ", this.props.router, this.props)
  }

  componentDidMount() { // the app is mounted, DOM nodes are ready
    Backbone.boot() // boot the backbone
    this.updateSession(Backbone.sessionActive) // update the session
  }

  updateSession(loggedIn) { // indicate whether or not a user is logged in
    this.setState({ active: loggedIn })
    // if (loggedIn) window.location = '/';
  }

  render() { // render the app's view
    let loggedIn = this.state.active,
        navLinks = loggedIn? [
          <button key={0} className="upload" data-tooltip="Upload"><i className="icon-upload" /></button>,
          <button key={1} className="logout" data-tooltip="Log Out"><i className="icon-exit" /></button>
        ] : [
          <button key={0} className="signup" data-tooltip="Sign Up"><i className="icon-quill" /></button>,
          <button key={1} className="login" data-tooltip="Log In"><i className="icon-enter" /></button>
        ]
    return (
      <div className="App">
        <header>
          <HeaderForms active={loggedIn} />
          <nav>
            <Link to="/" className="logo" data-tooltip="Home">Pqtrz.</Link>
            <div className="icons">{ navLinks }</div>
          </nav>
        </header>
          <Route exact path="/" component={Home} />
          <Route path="/single/:hash" component={Single} />
        <footer>&copy; 2017 | Pqtrz. No Rights Reserved. Yet.</footer>
      </div>
    )
  }
}

ReactDOM.render(
 <BrowserRouter>
   <App ref={ app => Backbone.saveRef('app', app) } />
 </BrowserRouter>,
 document.getElementsByTagName('app')[0]
)
