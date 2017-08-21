import Backbone from './modules/backbone'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './index.scss'
import TransitionGroup from 'react-transition-group/TransitionGroup'

import Home from './components/home'
import Single from './components/single'
import Upload from './components/upload'
import Login from './components/login'
import Register from './components/register'

class App extends Component {
  componentDidMount() { // the app is mounted, DOM nodes are ready
    Backbone.boot() // boot the backbone
  }

  render() { // render the app's view
    return (
      <div className="App">
        <header>
          <nav className="nav-bar">
            <Link to="/"><span className="logo">Pqtrz.</span></Link>
            <Link to="/">Home</Link>
            <Link to="/single">Single</Link>
            <Link to="/upload">Upload</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </nav>
        </header>
          <Route exact path="/" component={Home} />
          <Route exact path="/single" component={Single} />
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
   <App />
 </BrowserRouter>,
 document.getElementsByTagName('app')[0]
)
