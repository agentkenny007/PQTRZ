import React, { Component } from 'react'
import { Loading } from './misc'
import { Link } from 'react-router-dom'
import app from '../modules/backbone'
import template from '../images/template.png'

export default class PqtrContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { content: this.props.content }
  }

  update(content) {
    this.setState({ content: content })
  }

  render() {
    let content = app.pqtrz.length ? this.state.content : <Loading />
    return <div className="container">{ content }</div>
  }
}

export class PqtrList extends Component {
  render() {
    let pqtrz = this.props.pqtrz
    pqtrz = pqtrz && pqtrz.length ? pqtrz.map((pqtr, i) => <PqtrCard key={i} pqtr={pqtr} index={i} />) : []
    return <ul>{ pqtrz }</ul>
  }
}

class PqtrCard extends Component {
  render() {
    let index = this.props.index,
        pqtr = this.props.pqtr,
        style = {
          backgroundImage: `url(${pqtr.blob})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }
    return (
      <li className="image" data-index={index}>
        <Link to={'single/' + pqtr.hash} style={style} title={pqtr.desc} data-t={pqtr.capt}>
          <img src={template} alt={pqtr.capt} />
        </Link>
        <div className="likes" title="click to like">
            <i className="fa fa-heart"></i>
            { pqtr.likes || 0 }
        </div>
      </li>
    )
  }
}
