import Backbone from './modules/backbone'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './styles.css'

class App extends Component {
  componentDidMount() { // the app is mounted, DOM nodes are ready
    Backbone.boot() // boot the backbone
  }

  render() { // render the app's view
    return (
      <div className="App">
          <header>
              <h2>Pqtrz.</h2>
              <span className="icon"></span>
              <nav>
                  <a href="/">Home</a> |
                  <a href="/add">Add</a>
              </nav>
          </header>
          <div className="wrapper">
            <h2>Welcome Home!</h2>
            <button className="register">register</button>
            <button className="login">login</button>
            <form className="addPqtr">
              <input type="text" name="source" placeholder="picture url..." />
              <input type="text" name="capt" placeholder="picture caption..." />
              <textarea name="desc" placeholder="picture description..." />
              <button className="add" role="submit">add</button>
            </form>
          </div>
          <footer>&copy; 2017 | Pqtrz. No Rights Reserved. Yet.</footer>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementsByTagName('app')[0])
