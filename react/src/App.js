import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register'
import Movies from './pages/Movies'

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/login" exact render={props => <Login {...props}/>}  />
          <Route path="/register" exact render={props => <Register {...props}/>} />
          <Route path="/" exact render={props => <Movies {...props} />} />
        </Switch>
      </div>
    )
  }
}





