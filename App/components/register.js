import React, { Component } from 'react'

export default class Register extends Component {
 render() {
  return (
   <page>
     <h2>Register and start uploading pqtrz!</h2>
     <form className="register-form">
       <input type="text" name="first" placeholder="enter your first name" />
       <input type="text" name="last" placeholder="enter your first name" />
       <input type="text" name="username" placeholder="enter a username..." />
       <input type="text" name="email" placeholder="enter your email address" />
       <input type="text" name="password" placeholder="enter a password..." />
       <button role="submit" className="register">register</button>
     </form>
   </page>
  )
 }
}
