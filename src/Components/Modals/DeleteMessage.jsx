/** React */
import React, { Component } from 'react';

/** Image Import */
import CloseButtonImg from '../../assets/images/icons/cancel.png';

/** CSS Styling */
import './modals.scss';

/**
 * @class
 * @extends Component
 * Class component that displays the delete message modal <br/>
 * This component is called at Wall.jsx <br/>
 * Last date updated: December 19, 2022
 */
export default class DeleteMessage extends Component {

	/**
	 * DOCU: Handles the form submission of delete message and also triggers the props. <br/>
	 * Triggered: when the user clicks the delete button to submit the form. <br/>
	 * Last date updated: December 19, 2022
	 * @function
	 * @memberOf DekteNessage.jsx
	 * @param {object} event - get the event object to prevent submitting
	 * @author Edmond 
	 */
	onSubmit = (event) => {
		event.preventDefault();
		this.props.deleteMessage(this.props.message_id);
		this.props.toggleModal();
	}

	render() {
		const {toggleModal} = this.props;
		return (
				<div className="modal">
					<form onSubmit={this.onSubmit} id="delete_message_form" action="/" method="POST">
						<button onClick={toggleModal} className="close_modal_btn" type="button" title="Close Modal">
							<img src={CloseButtonImg} alt="Close button for this modal" />
						</button>
						<h3>Confirm Delete Message</h3>
						<p>Are you sure you want to remove this Message? <br/>This action cannot be undone.</p>
						<button type="button" className="action_btn cancel_btn" onClick={toggleModal}>Cancel</button>
						<button type="submit" className="modal_delete_btn">Yes, Remove it.</button>
					</form>
				</div>
			)
		}
}
