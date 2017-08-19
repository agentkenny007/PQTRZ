import Backbone from './modules/backbone'
import React, { Component } from 'react'
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Link } from "react-router-dom"
import './index.scss'

import Home from './components/home'
import Single from './components/single'

class App extends Component {
  componentDidMount() { // the app is mounted, DOM nodes are ready
    Backbone.boot() // boot the backbone
  }

  render() { // render the app's view
    return (
      <div className="App">
        <header>
          <nav className="nav-bar">
            <span className="logo">Pqtrz.</span>
            <Link to="/">Home</Link>
            <Link to="/single">Single</Link>
          </nav>
        </header>
        <footer>&copy; 2017 | Pqtrz. No Rights Reserved. Yet.</footer>
          <Route exact path="/" component={Home} />
          <Route exact path="/single" component={Single} />
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
