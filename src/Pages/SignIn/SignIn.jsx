import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PersonImage from '../../assets/images/userpanel.png';
import {inputChange} from '../../__helpers/helpers';
import './signin.scss';

export default class SignIn extends Component {
	state = {
		email: '',
		password: '',
		errors: {}
	}

	formValidation = () => {
		const {email, password} = this.state;
		let is_valid = true;
		const errors = {};

		if(!email.length){
			errors.email = "Email is required";
			is_valid = false;
		}
		else if(!email.includes(".com")){
			errors.email = "Please provide a valid email";
			is_valid = false;
		}

		if(!password.length){
			errors.password = "Password is required";
			is_valid = false;
		}
		else if(password.length < 6){
			errors.password = "Password must be at least 6 characters";
			is_valid = false;
		}
		else if(password !== '123456'){
			errors.password = "Password is incorrect";
			is_valid = false;
		}

		this.setState({errors});
		return is_valid;
	}

	onSubmit = (event) => {
		event.preventDefault();
		let is_valid = this.formValidation();
		if(is_valid){
			this.props.authenticate();
		}
	}

	render() {
		const {errors} = this.state;
		return (
		<div id="wrapper">
			<section>
				<form onSubmit={this.onSubmit} id="sign_in_form" action="/" method="POST">
					<h2>The Wall</h2>
					<h1>Log In</h1>
					<div className="input_control">
						<label htmlFor="email">Email</label>
						<input
							className={errors.email? "error_input": '' } 
							tabIndex={1} 
							id="email" 
							type="email" 
							name="email"
							onChange={event => inputChange(this, event, event.target.name)}
						/>
						<div className="error_message">{errors.email}</div>
					</div>
					<div className="input_control">
						<label htmlFor="password">Password</label>
						<a href="#">Forgot Password ?</a>
						<input 
							className={errors.password? "error_input": '' }
							tabIndex={2} 
							id="password" 
							type="password" 
							name="password"
							onChange={event => inputChange(this, event, event.target.name)}
							autoComplete="true"
						/>
						<div className="error_message">{errors.password}</div>
					</div>
					<button tabIndex={3} type="submit">SIGN IN</button>
					<p>I don’t have an account ? <Link to="/sign-up">Sign Up</Link></p>
				</form>
			</section>
			<div id="image_container">
				<img src={PersonImage} alt="Image of a person standing and holding a paper"/>
			</div>
		</div>
		)
	}
}
