import React, { Component } from 'react';
import AvatarImg from '../../assets/images/icons/avatar.png';
import PencilWrite from '../../assets/images/icons/pencil-write.png';
import DeleteImg from '../../assets/images/icons/delete.png';
import { inputChange, toggleUpdate } from '../../__helpers/helpers';
import './comments.scss';

export default class Comments extends Component {
    state = {
		toggle_update_btn: false,
		validate_update: this.props.comment
    }

	/** On comment update */
	onUpdate = (event, message_id, comment_id) => {
		event.preventDefault();
		let update_comment = event.target.childNodes[0].value;
		this.props.updateComment(message_id, comment_id, update_comment);
		toggleUpdate(this, 'comment');
		this.setState({validate_update: ''});
	}

  render() {
    const {toggle_update_btn, validate_update} = this.state;
    const {comment, message_id, getCommentId} = this.props;

    return (
      <li className="comment_control ">
        {!toggle_update_btn
			? 	<div className="comment">
					<p className="comment_text">{comment.comment}</p>
					<div className="actions_control">
						<button onClick={() => toggleUpdate(this, 'comment')} className="edit_btn" type="button">
							<img src={PencilWrite} alt="Edit Message Icon blue" />
							Edit
						</button>
						<button onClick={()=> getCommentId(message_id, comment.comment_id)} className="delete_btn" type="button">
							<img src={DeleteImg} alt="Trash can icon for delete message" />
							Delete
						</button>
						<button type="button" className="profile_btn">
							<img src={AvatarImg} alt="Your avatar profile image" />
							<span>You</span> - few seconds ago
						</button>
					</div>
				</div>
			:	<form onSubmit={event => this.onUpdate(event, message_id, comment.comment_id)} className="update_comment_form" action="/" method="POST">
					<textarea 
						onChange={event => inputChange(this, event, 'validate_update')} 
						name="update_comment_input" 
						value={validate_update.comment}
					>
					</textarea>
					<button onClick={() => toggleUpdate(this, 'comment')} type="button" className="cancel_btn">Cancel</button>
					<button type="submit" disabled={!validate_update}>Update Comment</button>
				</form>
        }
      </li>
    )
  }
}
