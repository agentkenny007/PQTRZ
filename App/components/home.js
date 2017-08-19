import React, { Component } from "react"

export default class Home extends Component {
 render() {
  return (
   <div className="page">
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
  )
 }
}
