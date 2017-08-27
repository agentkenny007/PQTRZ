import React, { Component } from 'react'

export default class Forms extends Component {
    constructor(props){
        super(props)
    }
    render() {
        let forms = this.props.active ? [
            <form className="upload-form">
                <label>Caption</label>
                <input type="text" name="capt" placeholder=" caption..." />
                <label>Image URL</label>
                <input type="text" name="source" placeholder=" url..." />
                <label>Description</label>
                <textarea name="desc" placeholder="description..." />
                <button role="submit">Upload!</button>
            </form>
        ] : [
            <form key={0} className="signup-form">
                <div>
                    <div>
                        <span>
                            <label className="name">First Name</label>
                            <input className="first name" type="text" name="first" placeholder="(optional)" />
                        </span>
                        <span>
                            <label className="name">Last Name</label>
                            <input className="last name" type="text" name="last" placeholder="(optional)" />
                        </span>
                        <label>Email</label>
                        <input type="text" name="email" placeholder="enter your email address" />
                        <label>Password</label>
                        <input type="text" name="password" placeholder="enter a password..." />
                        <button className="signup-next">Next <i className="icon-arrow-right" /></button>
                    </div>
                    <div>
                        <label>Create a Username</label>
                        <input type="text" name="username" placeholder="pick a username..." />
                        <label>Re-enter Password</label>
                        <input type="text" name="password" placeholder="re-enter password..." />
                        <button role="submit">Sign Up</button>
                        <button className="back"><i className="icon-return" /></button>
                    </div>
                </div>
            </form>,
            <form key={1} className="login-form">
                <label>Username</label>
                <input type="text" name="username" placeholder="your username..." />
                <label>Password</label>
                <input type="password" name="password" placeholder="your password..." />
                <button role="submit">Log In <i className="icon-arrow-right" /></button>
            </form>
        ], hide = <button className="hide" />
        return <section>{ hide }{ forms }</section>
    }
}
