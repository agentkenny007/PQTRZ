import React, { Component } from 'react'

export default class Upload extends Component {
 render() {
  return (
   <page>
    <h1>Upload a pqtr today!</h1>
    <form className="upload">
      <input type="text" name="source" placeholder="picture url..." />
      <input type="text" name="capt" placeholder="picture caption..." />
      <textarea name="desc" placeholder="picture description..." />
      <button className="add" role="submit">add</button>
    </form>
    <p>Hello from a pqtr page!</p>
   </page>
  )
 }
}
