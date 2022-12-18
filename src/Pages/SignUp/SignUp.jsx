import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PersonImage from '../../assets/images/userpanel.png';
import './signup.scss';

export default class SignUp extends Component {
  state = {
    email: '',
    password: '',
    confirm_password: '',
    errors: {}
  }

  formValidation = () => {
    const {email, password, confirm_password} = this.state;
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
    
    if(!confirm_password.length){
      errors.confirm_password = "Confirm password is required";
      is_valid = false;
    }
    else if(password !== confirm_password){
      errors.confirm_password = "Confirm password does not match";
      is_valid =false;
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

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }


  render() {
    const {errors} = this.state;
    return (
      <div id="wrapper">
        <section>
        <form onSubmit={this.onSubmit} id="sign_up_form" action="/" method="POST">
            <h2>The Wall</h2>
            <h1>Register</h1>
            <div className="input_control">
              <label htmlFor="email">Email</label>
              <input
                className={errors.email? "error_input": '' } 
                tabIndex={1} 
                id="email" 
                type="email" 
                name="email"
                onChange={this.onChange}
              />
              <div className="error_message">{errors.email}</div>
            </div>
            <div className="input_control">
              <label htmlFor="password">Password</label>
              <input 
                className={errors.password? "error_input": '' }
                tabIndex={2} 
                id="password" 
                type="password" 
                name="password"
                onChange={this.onChange}
                autoComplete="true"
              />
              <div className="error_message">{errors.password}</div>
            </div>
            <div className="input_control">
              <label htmlFor="confirm_password">Confirm Password</label>
              <input 
                className={errors.password? "error_input": '' }
                tabIndex={2} 
                id="confirm_password" 
                type="password" 
                name="confirm_password"
                onChange={this.onChange}
                autoComplete="true"
              />
              <div className="error_message">{errors.confirm_password}</div>
            </div>
            <p className="text">By creating an account, you agree with The W all's <a href="#">Privacy Policy</a> and <a href="#">Terms of Use</a>.</p>
            <button tabIndex={3} type="submit">SIGN IN</button>
            <p className="text">Already have an account ? <Link to="/">Sign Up</Link></p>
          </form>
        </section>
        <div id="image_container">
          <img src={PersonImage} alt="Image of a person standing and holding a paper"/>
        </div>
      </div>
    )
  }
}
