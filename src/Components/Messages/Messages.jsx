import React, { Component } from 'react';
import {Comments} from '../../Components';
import AvatarImg from '../../assets/images/icons/avatar.png';
import PencilWrite from '../../assets/images/icons/pencil-write.png';
import DeleteImg from '../../assets/images/icons/delete.png';
import {inputChange, toggleUpdate} from '../../__helpers/helpers';
import './messages.scss';

export default class Messages extends Component {
	state = {
		validate_update: this.props.message,
		validate_comment: '',
		toggle_update_btn: false,
		toggle_comment_btn: false,
		comments: []
	}

	/** Toggle between displaying comments or not*/
	toggleCommentBtn = () => {
		if(this.state.toggle_comment_btn){
			this.setState({toggle_comment_btn: false});
		}
		else{
			this.setState({toggle_comment_btn: true});
		}
	}

	/** Update Message */
	messageUpdate = (event) => {
		event.preventDefault();
		let update_message = event.target.childNodes[0].value;
		this.props.updateMessage(this.props.message_id, update_message);
		toggleUpdate(this, 'message');

	}

	submitAddComment = (event) => {
		event.preventDefault();
		let comment = event.target.childNodes[0].value;
		this.props.addComment(this.props.message_id, comment);
		this.setState({validate_comment: ''});
	}	


	render() {
		const {toggle_update_btn, toggle_comment_btn, validate_comment, validate_update, comments} = this.state;
		const {message, messageDeleteId, message_id, updateComment, getCommentId} = this.props;
		return (
			<li className="message_control">
				<div className={!toggle_update_btn? "message" : "hidden"}>
					<p className="message_text">{message.message}</p>
					<div className="actions_control">
						<button onClick={this.toggleCommentBtn} type="button" className={message.comments.length? "add_comment_active" : "add_comment_inactive"}>
							<span className="add_comment_btn_icon"></span>
							<span className="comment_counter">{message.comments.length}</span>
							Comment
						</button>
						<button onClick={()=> toggleUpdate(this, 'message')} className="edit_btn" type="button">
							<img src={PencilWrite} alt="Edit Message Icon blue" />
							Edit
						</button>
						<button onClick={() => messageDeleteId(message_id)} className="delete_btn" type="button">
							<img src={DeleteImg} alt="Trash can icon for delete message" />
							Delete
						</button>
						<button type="button" className="profile_btn">
							<img src={AvatarImg} alt="Your avatar profile image" />
							<span>You</span> - few seconds ago
						</button>
					</div>     
				</div>
				<form onSubmit={this.messageUpdate} className={!toggle_update_btn? "hidden" : "update_message_form" }action="/">
					<textarea 
						onChange={event=> inputChange(this, event, 'validate_update')} 
						value={validate_update.message}
						name="update_message_input"
					>
					</textarea>  
					<button onClick={()=> toggleUpdate(this, 'message')} className="cancel_btn" type="button">Cancel</button>
					<button type="submit" disabled={!validate_update}>Update Message</button>
				</form>
				<ul className={!toggle_comment_btn? "hidden" : "comment_container"}>
					<li>
						<form onSubmit={this.submitAddComment} className="comment_form" action="/" method="POST">
							<textarea 
								onChange={event => inputChange(this, event, 'validate_comment')} 
								name="comment_input" 
								placeholder="Type your comment here." 
								value={validate_comment}
							>
							</textarea>
							<button type="submit" disabled={!validate_comment}>Post Comment</button>
						</form>
					</li>
					{message.comments.map(index =>{
						return (
						<Comments 
							key={index.comment_id}
							message_id={message_id}
							comment={index}
							updateComment={updateComment}
							getCommentId={getCommentId}
						/>
						) 
					})}
				</ul>
			</li>
		)
	}
}
