import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { AUTH_TOKEN } from '../constants'


class Home extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)

    if (authToken) {
      return(
        <div>
          <h1 className="f4">Welcome to the Dashboard!</h1>
          <h2 className="f6">Not much to see around here. All you can do is logout...</h2>
          <div
            class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN)
              this.props.history.push('/login')
            }}
          >
            Logout
          </div>
        </div>
      )
    } else {
      return(
        <Redirect to='/login' />
      )
    }
  }
}

export default Home
