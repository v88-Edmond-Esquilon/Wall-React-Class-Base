/** React */
import React, { Component } from 'react';

/** Image Import */
import CloseButtonImg from '../../assets/images/icons/cancel.png';

/** Helpers */
import {inputChange} from '../../__helpers/helpers';

/** CSS Styling */
import './modals.scss';


/**
 * @class
 * @extends Component
 * Class component that displays the create message modal <br/>
 * This component is called at Wall.jsx <br/>
 * Last date updated: December 19, 2022
 */
export default class CreateMessage extends Component {
	state = {
		message: ''
	}

	/**
	 * DOCU: Handles the visibility of this modal and and resets the value of state message. <br/>
	 * Triggered: when the user clicks the close button and cancel button <br/>
	 * Last date updated: December 19, 2022
	 * @function
	 * @memberOf CreateMessage.jsx
	 * @author Edmond 
	 */
	onClose = () => {
		this.props.toggleModal();
		this.setState({message: ''});
	}

	/**
	 * DOCU: Handles the form submission of delete message and also triggers the props. <br/>
	 * Triggered: when the user clicks the delete button to submit the form. <br/>
	 * Last date updated: December 19, 2022
	 * @function
	 * @memberOf CreateMessage.jsx
	 * @param {object} event - get the event object to prevent submitting
	 * @author Edmond 
	 */
	onSubmit = (event) => {
		event.preventDefault();
		this.props.addMessage(this.state.message);
		this.onClose();
	}

 	 render() {
		const {message} = this.state;
		return (
			<div className="modal">
				<form onSubmit={this.onSubmit} id="create_message_form" action="/" method="POST">
					<button onClick={this.onClose} className="close_modal_btn" type="button" title="Close Modal">
						<img src={CloseButtonImg} alt="Close button for this modal" />
					</button>
					<h3>Create a Message</h3>
					<textarea onChange={event => inputChange(this, event, 'message')} name="message" placeholder="Type your message here."></textarea>
					<div>
						<button onClick={this.onClose}  type="button" className="cancel_btn action_btn">Cancel</button>
						<button type="submit" className="action_btn" disabled={!message}>Post Message</button>
					</div>
				</form>
			</div>
		)
	}
}
