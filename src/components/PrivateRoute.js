import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute ({ component: Component, authed, path2, ...rest }) {
  if (path2 === '/') {
    console.log(path2)
    console.log(authed)
    console.log(Component)
    return (
      <Route
        {...rest}
        render={(props) => authed === true
          ? <Component {...props} />
          : <Redirect to='/login' />}
      />
    )
  } else {
    console.log(path2)
    console.log(authed)
    console.log(Component)
    return (
      <Route
        render={(props) => authed === false
          ? <Component {...props} />
          : <Redirect to='/' />}
      />
    )

  }
}

export default PrivateRoute
