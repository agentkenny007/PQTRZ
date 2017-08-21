import React, { Component } from 'react'

export default class Login extends Component {
 render() {
  return (
   <page>
     <h2>Please enter your credentials to log in.</h2>
     <form className="login-form">
       <input type="text" name="username" placeholder="your username..." />
       <input type="password" name="password" placeholder="your password..." />
       <button role="submit">login</button>
     </form>
   </page>
  )
 }
}
