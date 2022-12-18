import React, { Component } from 'react';
import { DeleteComment } from '../../Components';
import AvatarImg from '../../assets/images/icons/avatar.png';
import PencilWrite from '../../assets/images/icons/pencil-write.png';
import DeleteImg from '../../assets/images/icons/delete.png';
import './comments.scss';

export default class Comments extends Component {
  state = {
    update_comment_btn: false,
    validate_update: this.props.comment,
    delete_comment_modal: false
  }
  /** Displays delete comment modal*/
  toggleDeleteComment = () => {
    if(this.state.delete_comment_modal){
      this.setState({delete_comment_modal : false});
      document.querySelector('body').classList.remove('no_scroll');
    }
    else{
      this.setState({delete_comment_modal : true});
      document.querySelector('body').classList.add('no_scroll');
    }
  }
  /** Toggle between update comment or not*/
  toggleUpdateComment = () => {
    if(this.state.update_comment_btn){
      this.setState({update_comment_btn: false});
    }
    else{
      this.setState({update_comment_btn: true, validate_update: this.props.comment});
    }
  }
  /** Validate Input*/
  onChange = (event) => {
    this.setState({validate_update: event.target.value});
  }
  /** On comment update */
  onUpdate = (event) => {
    event.preventDefault();
    let update_comment = event.target.childNodes[0].value;
    this.props.updateComment(this.props.comment_id, update_comment);
    this.toggleUpdateComment();
    this.setState({validate_update: ''});
  }

  render() {
    const {update_comment_btn, validate_update, delete_comment_modal}= this.state;
    const {comment, comment_id, deleteComment} = this.props;
    return (
      <li className="comment_control ">
        {
          !update_comment_btn? (
            <div className="comment">
              <p className="comment_text">{comment}</p>
              <div className="actions_control">
                  <button onClick={this.toggleUpdateComment} className="edit_btn" type="button">
                    <img src={PencilWrite} alt="Edit Message Icon blue" />
                    Edit
                  </button>
                  <button onClick={this.toggleDeleteComment} className="delete_btn" type="button">
                    <img src={DeleteImg} alt="Trash can icon for delete message" />
                    Delete
                  </button>
                  <button type="button" className="profile_btn">
                    <img src={AvatarImg} alt="Your avatar profile image" />
                    <span>You</span> - few seconds ago
                  </button>
              </div>
            </div>
          ):
          (
            <form onSubmit={this.onUpdate} className="update_comment_form" action="/" method="POST">
              <textarea onChange={this.onChange} name="update_comment_input" value={validate_update}></textarea>
              <button onClick={this.toggleUpdateComment} type="button" className="cancel_btn">Cancel</button>
              <button type="submit" disabled={!validate_update}>Update Comment</button>
            </form>
          )
        }
        {
          delete_comment_modal && (
            <DeleteComment
              toggleDeleteComment={this.toggleDeleteComment}
              comment_id={comment_id}
              deleteComment={deleteComment}
            />
          )
        }
      </li>
    )
  }
}
