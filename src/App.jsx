import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignUp, SignIn, Wall } from './Pages';
import './App.scss';

export default class App extends Component {
  state = {
    logged_in: true,
  }

  authenticate = () => {
    if(!this.state.logged_in) {
      this.setState({ logged_in: true });
    }
    else{
      this.setState({ logged_in: false });
    }
  }

  render() {
    const { logged_in } = this.state;
    return (
      <Router>
        <Routes>
          <Route path="/" element={!logged_in? <SignIn authenticate={this.authenticate}/> : <Navigate to="/wall-dashboard"/>} />
          <Route path="sign-up" element={!logged_in? <SignUp authenticate={this.authenticate}/> : <Navigate to="/wall-dashboard"/>} />
          <Route path="wall-dashboard" element={logged_in? <Wall authenticate={this.authenticate}/> : <Navigate to="/"/> } />
        </Routes>
      </Router>
    )
  }
}
