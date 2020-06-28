import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './Header'
import Login from './Login'
import Home from './Home'

class App extends Component {
  render() {
    return (
      <div className="pa4 black-80 measure center">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    )
  }
}

export default App
