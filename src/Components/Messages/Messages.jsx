import React, { Component } from 'react';
import {Comments, DeleteMessage } from '../../Components';
import AvatarImg from '../../assets/images/icons/avatar.png';
import PencilWrite from '../../assets/images/icons/pencil-write.png';
import DeleteImg from '../../assets/images/icons/delete.png';
import './messages.scss';

export default class Messages extends Component {
  state = {
    validate_update: this.props.message,
    validate_comment: '',
    toggle_update_btn: false,
    toggle_comment_btn: false,
    comments: []
  }

  /** Displays delete message modal*/
  onClick = () => {
    this.props.toggleModal('delete_message_modal');
  }
  /** Toggle between message and update message form */
  toggleUpdateMessage = () => {
    if(this.state.toggle_update_btn){
      this.setState({toggle_update_btn: false});
    }
    else{
      this.setState({toggle_update_btn: true, validate_update: this.props.message});
    }
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

  onChange = (event) => {
    if(event.target.name === 'update_message_input'){
      this.setState({validate_update: event.target.value});
    }
    else if(event.target.name === 'comment_input'){
      this.setState({validate_comment: event.target.value});
    }
  }

  onUpdate = (event) => {
    event.preventDefault();
    let update_message = event.target.childNodes[0].value;
    this.props.updateMessage(this.props.message_id, update_message);
    this.toggleUpdateMessage();
  }



  render() {
    const {toggle_update_btn, toggle_comment_btn, validate_comment, validate_update} = this.state;
    const {delete_message_modal, delete_comment_modal, toggleModal, message, message_id, deleteMessage} = this.props;
    return (
      <li className="message_control">
          <div className={!toggle_update_btn? "message" : "hidden"}>
            <p className="message_text">{message_id}</p>
            <div className="actions_control">
              <button onClick={this.toggleCommentBtn} type="button" className="add_comment_inactive">
                <span className="add_comment_btn_icon"></span>
                <span className="comment_counter">0</span>
                Comment
              </button>
              <button onClick={this.toggleUpdateMessage} className="edit_btn" type="button">
                <img src={PencilWrite} alt="Edit Message Icon blue" />
                Edit
              </button>
              <button onClick={this.onClick} className="delete_btn" type="button">
                <img src={DeleteImg} alt="Trash can icon for delete message" />
                Delete
              </button>
              <button type="button" className="profile_btn">
                <img src={AvatarImg} alt="Your avatar profile image" />
                <span>You</span> - few seconds ago
              </button>
            </div>     
          </div>
          <form onSubmit={this.onUpdate} className={!toggle_update_btn? "hidden" : "update_message_form" }action="/">
            <textarea onChange={this.onChange} value={validate_update} name="update_message_input"></textarea>  
            <button onClick={this.toggleUpdateMessage} className="cancel_btn" type="button">Cancel</button>
            <button type="submit" disabled={!validate_update}>Update Message</button>
          </form>
          <ul className={!toggle_comment_btn? "hidden" : "comment_container"}>
            <li>
              <form onSubmit={()=>{}} className="comment_form" action="/" method="POST">
                <textarea onChange={this.onChange} name="comment_input" placeholder="Type your comment here."></textarea>
                <button type="submit" disabled={!validate_comment}>Post Comment</button>
              </form>
            </li>
            <Comments 
              delete_comment_modal={delete_comment_modal}
              toggleModal={toggleModal}
            />
          </ul>

        {
          delete_message_modal && (
            <DeleteMessage
              deleteMessage={deleteMessage}
              message_id={message_id}
              toggleModal={toggleModal}
            />
          )
        }
      </li>
    )
  }
}
