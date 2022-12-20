/** React */
import React, { Component } from 'react';

/** Plugins */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

/** Componnents */
import { SignUp, SignIn, Wall } from './Pages';

/** CSS Styling */
import './App.scss';

export default class App extends Component {
	state = {
		logged_in: false,
	}

	/**
	 * DOCU: Determines if the user is logged in or not. <br/>
	 * Triggered: when the user is successfully logged in changes the state value. <br/>
	 * Last date updated: December 19, 2022
	 * @function
	 * @memberOf App.jsx
	 * @author Edmond
	 */
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
