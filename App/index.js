import Backbone from './modules/backbone'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import './index.scss'
import TransitionGroup from 'react-transition-group/TransitionGroup'

import Home from './components/home'
import Single from './components/single'
import Upload from './components/upload'
import Login from './components/login'
import Register from './components/register'

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
    let navLinks = this.state.active? [
          <Link key={0} to="/upload"><i className="icon-upload" /></Link>,
          <button key={1} className="logout"><i className="icon-exit" /></button>
        ] : [
          <Link key={0} to="/register"><i className="icon-quill" /></Link>,
          <Link key={1} to="/login"><i className="icon-enter" /></Link>
        ]
    return (
      <div className="App">
        <header>
          <nav className="nav-bar">
            <Link to="/"><span className="logo">Pqtrz.</span></Link>
            <div className="icons">{ navLinks }</div>
          </nav>
        </header>
          <Route exact path="/" component={Home} />
          <Route path="/single/:hash" component={Single} />
          <Route exact path="/upload" component={Upload} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
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
