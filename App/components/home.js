import $ from 'jquery'
import React, { Component } from 'react'
import Container, { PqtrList } from './pqtr-container'
import app from '../modules/backbone'

export default class Home extends Component {
  render() {
    $('body').css("background", 'rgb(245, 247, 250)')
    return (
      <page>
        <Container
          content={ <PqtrList pqtrz={app.pqtrz} /> }
          ref={ container => app.saveRef('pqtr-container', container) }
        />
      </page>
    )
  }
}
