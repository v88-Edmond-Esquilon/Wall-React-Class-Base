import React, { Component } from 'react';
import {CreateMessageModal, DeleteMessageModal, DeleteCommentModal, Messages} from '../../Components';
import {Link} from 'react-router-dom';
import { generateId, toggleModal } from '../../__helpers/helpers';
import NoMessageImg from '../../assets/images/landing_page.png';
import './wall.scss';

export default class Wall extends Component {
	state = {
		is_show_create_message: false,
		is_show_delete_message_modal: false,
		is_show_delete_comment_modal: false,
		messages: [],
		message_delete_id: '',
		comment_delete_id: {message_id: '', comment_id: ''}
	}

	addMessage = (message) => {
		this.setState({ messages: [{message_id: generateId(), message: message, comments: []}, ...this.state.messages]});
	}

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

	deleteMessage = (message_id) => {
		let {messages} = this.state;
		this.setState({messages: messages.filter(message => message.message_id !== message_id), message_delete_id: ''});
	}

	getMessageId = (message_id) => {
		this.setState({message_delete_id: message_id});
		toggleModal(this, 'is_show_delete_message_modal');
	}

	addComment= (message_id, comment) => {
		const {messages} = this.state;
		const message = messages.find(message => message.message_id === message_id);
		message.comments = [{comment_id: generateId(), comment: comment}, ...message.comments];
		this.setState({messages});
	}

	updateComment = (message_id, comment_id, update_comment) => {
		const {messages} = this.state;
		const message = messages.find(message => message.message_id === message_id);
		const comment = message.comments.find(comment => comment.comment_id === comment_id);
		comment.comment = update_comment;
		this.setState({messages});
	}	

	deleteComment = (message_id, comment_id) => {
		let {messages} = this.state;
		const message = messages.find(message => message.message_id === message_id);
		message.comments = message.comments.filter(comment => comment.comment_id !== comment_id);
		this.setState({messages, comment_delete_id: {message_id: '', comment_id: ''}});
	}

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
							<button onClick={()=> toggleModal(this, 'is_show_create_message')} id="create_message_btn" type="button">Create Message</button>
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
