import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Redirect } from 'react-router-dom'

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: '',
  }

  render() {
    const { login, email, password, name } = this.state
    const authToken = localStorage.getItem(AUTH_TOKEN)

    if (!authToken) {
      return (
        <div>
          <legend className="f4 fw6 ph0 mh0">{ login ? 'Sign In' : 'Sign Up'}</legend>
          <div>
            {!login && (
              <div className="mt3">
                <label className="db fw6 lh-copy f6" for="email-address">Name</label>
                <input
                  class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={e => this.setState({ name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
            )}
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
                placeholder="Your e-mail"
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
                placeholder={`${login ? 'Your password' : 'Choose a safe password'}`}
              />
            </div>
            <div className="w-75 m-12 mv3 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6">
              <Mutation
                mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                variables={{ email, password, name }}
                onCompleted={data => {
                  if (login) {
                    if (data.login.token === '') {
                      alert('Invalid username or password')
                      return 
                    }
                  } else {
                    if (data.signup.token === '') {
                      alert(`User with email ${email} already exists`)
                      return 
                    }
                  }

                  this._confirm(data)
                }}
              >
                {mutation => (
                  <div
                    onClick={() => {
                      if (this.state.email === '' || this.state.password === '' ) {
                        alert('All fields must be filled')
                        return
                      }

                      mutation()
                    }}>
                    {login ? 'Login' : 'Create Account'}
                  </div>
                )}
              </Mutation>
            </div>
            <div
              className="w-75 m-12 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
              onClick={() => this.setState({ login: !login })}
            >
              {login ? 'Need to create an Account?' : 'Already have an Account?'}
            </div>
          </div>
        </div>
      )
      /*
      return (
        <div>
          <h4>{login ? 'Login' : 'Sign Up'}</h4>
          <div className="flex flex-column">
            {!login && (
              <input
                value={name}
                onChange={e => this.setState({ name: e.target.value })}
                type="text"
                placeholder="Your name"
              />
            )}
            <input
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
              type="text"
              placeholder="Your email address"
            />
            <input
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
              type="password"
              placeholder={login ? 'Your password' : 'Choose a safe password'}
            />
          </div>
          <div className="flex mt3">
            <Mutation
              mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
              variables={{ email, password, name }}
              // onCompleted={data => this._confirm(data)}
              onCompleted={data => {
                if (data.login.token === '') {
                  alert('Invalid username or password')
                  return 
                }
                this._confirm(data)
              }}
            >
              {mutation => (
                // <div className="pointer mr2 button" onClick={mutation}>
                <div className="pointer mr2 button" onClick={() => {
                  if (this.state.email === '' || this.state.password === '' || (!login && this.state.name === '')) {
                    alert('All fields must be filled')
                    return
                  }

                  mutation()
                }}>
                  {login ? 'login' : 'create account'}
                </div>
              )}
            </Mutation>
            <div
              className="pointer button"
              onClick={() => this.setState({ login: !login })}
            >
              {login ? 'need to create an account?' : 'already have an account?'}
            </div>
          </div>
        </div>
      )
      */
    } else {
      return(
        <Redirect to='/'/>
      )
    }
  }

  _confirm = async data => {
    const { token } = this.state.login ? data.login : data.signup
    this._saveUserData(token)
    const { history } = this.props
    history.push(`/`)
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export default Login
