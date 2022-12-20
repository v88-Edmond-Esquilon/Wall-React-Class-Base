import React, { Component } from 'react';
import CloseButtonImg from '../../assets/images/icons/cancel.png';
import {inputChange} from '../../__helpers/helpers';
import './modals.scss';

export default class CreateMessage extends Component {
  state = {
    message: ''
  }
	onClose = () => {
		this.props.toggleModal();
		this.setState({message: ''});
	}

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
