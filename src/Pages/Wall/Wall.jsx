/** React */
import React, { Component } from 'react';

/** Components */
import {CreateMessageModal, DeleteMessageModal, DeleteCommentModal, Messages} from '../../Components';

/** Plugin */
import {Link} from 'react-router-dom';

/** Helpers */
import { generateId, toggleModal } from '../../__helpers/helpers';

/** Image Import */
import NoMessageImg from '../../assets/images/landing_page.png';

/** CSS Styling */
import './wall.scss';

/**
 * @class
 * @extends Component
 * Class representing the Wall Dashboard page. <br/>
 * This class components is called at the App.jsx <br/>
 * Last date updated: December 19, 2022
 */

export default class Wall extends Component {
	state = {
		is_show_create_message: false,
		is_show_delete_message_modal: false,
		is_show_delete_comment_modal: false,
		messages: [],
		message_delete_id: '',
		comment_delete_id: {message_id: '', comment_id: ''}
	}

	/**
	 * DOCU: used for adding new messages to the array state of messages, this is passed as a props in CreateMessageModal. <br/>
	 * Triggered: when the user creates a new message at the CreateMessageModal. <br/>
	 * Last date updated: December 19, 2022
	 * @function
	 * @memberOf Wall.jsx
	 * @param {string} message
	 * @author Edmond 
	 */
	addMessage = (message) => {
		this.setState({ messages: [{message_id: generateId(), message: message, comments: []}, ...this.state.messages]});
	}

	/**
	 * DOCU: For updating the selected message by getting the message_id and the update_message, this is passed as a props in Messages. <br/>
	 * Triggered: when the user updates the selected message <br/>
	 * Last date updated: December 19, 2022
	 * @function
	 * @memberOf Wall.jsx
	 * @param {string} message_id - gets the id of the message from the child component Messages
	 * @param {string} update_message - gets the string value of the update_message from the child component Messages
	 * @author Edmond
	 */
	updateMessage = (message_id, update_message) => {
		const {messages} = this.state;
		this.setState({messages: 
			messages.map(message => {
				if(message.message_id === message_id){
					return {...message, message: update_message};
				} 
				return message;
			}),
			message_delete_id: ''
		});
	}

	/**
	 * DOCU: Deletes the selected message when it gets the message_id, this passed as a props in DeleteMessageModal. <br/>
	 * Triggered: when the user clicks the delete button at the delete message modal. <br/>
	 * Last date update: December 19, 2022
	 * @function
	 * @memberOf Wall.jsx
	 * @param {string} message_id - gets the message_id from the DeleteMessageModal
	 * @author Edmond
	 */
	deleteMessage = (message_id) => {
		let {messages} = this.state;
		this.setState({messages: messages.filter(message => message.message_id !== message_id), message_delete_id: ''});
	}

	/**
	 * DOCU: Gets the message_id and saves it to the state object and toggles the DeleteMessageModal. <br/>
	 * Triggered: When the user clicks the delete button on the message component. <br/>
	 * Last date updated: December 19, 2022
	 * @function
	 * @memberOf Wall.jsx
	 * @param {string} message_id - gets the message_id to be saved in the state
	 * @author Edmond
	 */
	getMessageId = (message_id) => {
		this.setState({message_delete_id: message_id});
		toggleModal(this, 'is_show_delete_message_modal');
	}

	/**
	 * DOCU: Add a new comment to the specific message and save it on the specific message state object, this will be passed a prop at Comments component. <br/>
	 * Triggered: when the user adds and submit the form at the Messages Component/ <br/>
	 * Last date updated: December 19, 2022
	 * @function
	 * @memberOf Wall.jsx
	 * @param {string} message_id - receives the message id to the specific message
	 * @param {string} comment - string value to add the comment to the message
	 * @author Edmond
	 */
	addComment= (message_id, comment) => {
		const {messages} = this.state;
		const message = messages.find(message => message.message_id === message_id);
		message.comments = [{comment_id: generateId(), comment: comment}, ...message.comments];
		this.setState({messages});
	}

	/**
	 * DOCU: Find the specific message which contains the selected comment to be updated, this will passed as a prop at Comments component. <br/>
	 * Triggered: when the user submits the form of update comment at the Comments component. <br/>
	 * Last date updated: December 19, 2022
	 * @function
	 * @memberOf Wall.jsx
	 * @param {string} message_id - string value of the specific message
	 * @param {string} comment_id - string value of the specific comment to be updated
	 * @param {string} update_comment - string value of update_comment 
	 * @author Edmond
	 */
	updateComment = (message_id, comment_id, update_comment) => {
		const {messages} = this.state;
		const message = messages.find(message => message.message_id === message_id);
		const comment = message.comments.find(comment => comment.comment_id === comment_id);
		comment.comment = update_comment;
		this.setState({messages});
	}	
	/**
	 * DOCU: Delete the specific comment after getting the specific message where the comment is being deleted, this is passed as a prop at DeleteMessageModal. <br/>
	 * Triggered: When the user clicks the delete button at the DeleteCommentModal. <br/>
	 * Last date updated: December 19, 2022
	 * @function
	 * @membeOf Wall.jsx
	 * @param {string} message_id - string value for the specific message
	 * @param {string} comment_id  - string value for the specific comment that to be deleted
	 * @author Edmond
	 */
	deleteComment = (message_id, comment_id) => {
		let {messages} = this.state;
		const message = messages.find(message => message.message_id === message_id);
		message.comments = message.comments.filter(comment => comment.comment_id !== comment_id);
		this.setState({messages, comment_delete_id: {message_id: '', comment_id: ''}});
	}

	/**
	 * DOCU: This gets the message_id and comment_id of the selected specific comment, this is also passed as a prop to  the Comments component. <br/>
	 * Triggered: When the user clicks the delete button at the Comments component. <br/>
	 * Last date updated: December 19, 2022
	 * @function
	 * @memberOf Wall.jsx
	 * @param {string} message_id - string value of the specific message_id that contains the comment
	 * @param {string} comment_id  - string value of the specific comment_id
	 * @author Edmond
	 */
	getCommentId = (message_id, comment_id) => {
		this.setState({comment_delete_id: {message_id: message_id, comment_id: comment_id}});
		toggleModal(this, 'is_show_delete_comment_modal');
	}

  render() {
	const {is_show_create_message, is_show_delete_comment_modal, is_show_delete_message_modal, messages, message_delete_id, comment_delete_id} = this.state;
	const {authenticate} = this.props;

		return (
			<div id="wall_wrapper">
				<nav>
					<h2><Link to="/" onClick={() => authenticate()}>The Wall Assignment</Link></h2>
					<p>Welcome, Edmond Esquilon <Link to="/" onClick={() => authenticate()}>Log out</Link></p>
				</nav>
				<div id="container">
					<main>
						<header>
							<p><span onClick={this.onClick} id="message_counter">{messages.length}</span> messages arranged by latest posted</p>
							<button 
								onClick={()=> toggleModal(this, 'is_show_create_message')} 
								id="create_message_btn" 
								type="button"
							>
								Create Message
							</button>
						</header>
						<div id="no_message_inbox" className={messages.length && "hidden"}>
							<img src={NoMessageImg} alt="No message inbox color blue" />
							<p>No Posted Message Yet.</p>
						</div>
						<ul id="message_container">
							{messages.map(index => {
								return (
									<Messages
										key={index.message_id}
										message_id={index.message_id}
										message={index}
										messageDeleteId={this.getMessageId}
										updateMessage={this.updateMessage}
										addComment={this.addComment}
										updateComment={this.updateComment}
										getCommentId={this.getCommentId}
									/>
								)
							})}
						</ul>
					</main>
				</div>
				{is_show_create_message && 
					<CreateMessageModal
						addMessage={this.addMessage}
						toggleModal={()=> toggleModal(this, 'is_show_create_message')}
					/>
				}
				{is_show_delete_message_modal && 
					<DeleteMessageModal
						deleteMessage={this.deleteMessage}
						toggleModal={()=> toggleModal(this, 'is_show_delete_message_modal')}
						message_id={message_delete_id}
					/>
				}
				{is_show_delete_comment_modal && 
					<DeleteCommentModal
						deleteComment={this.deleteComment}
						toggleModal={()=> toggleModal(this, 'is_show_delete_comment_modal')}
						comment_delete_id={comment_delete_id}
					/>
				}
			</div>
		)
	}
}
