import React, { Component } from 'react'
import { withRouter } from 'react-router'

class Header extends Component {
  render() {
    return(
      <h1 className="f2 fw6 ph3 mah">Simple React-GraphQL Auth</h1>
    )
  }
}

export default withRouter(Header)
