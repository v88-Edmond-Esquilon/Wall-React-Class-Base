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
    delete_message_modal: false,
    comments: []
  }

  /** Displays delete message modal*/
  toggleDeleteMessage = () => {
    if(this.state.delete_message_modal){
      this.setState({delete_message_modal : false});
      document.querySelector('body').classList.remove('no_scroll');
    }
    else{
      this.setState({delete_message_modal : true});
      document.querySelector('body').classList.add('no_scroll');
    }
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
  /** Input validation*/
  onChange = (event) => {
    if(event.target.name === 'update_message_input'){
      this.setState({validate_update: event.target.value});
    }
    else if(event.target.name === 'comment_input'){
      this.setState({validate_comment: event.target.value});
    }
  }
  /** Update Message */
  onUpdate = (event) => {
    event.preventDefault();
    let update_message = event.target.childNodes[0].value;
    this.props.updateMessage(this.props.message_id, update_message);
    this.toggleUpdateMessage();
  }

  addComments = (event) => {
    event.preventDefault();
    let comment = event.target.childNodes[0].value;
    const generate_id = Math.floor(Math.random() * 0xffffff).toString(16);
    this.setState({comments: [...this.state.comments, {id: generate_id, comment: comment}]});
    this.setState({validate_comment: ''});
  }

  deleteComment = (comment_id) => {
    this.setState({comments: this.state.comments.filter(comment => {return comment.id !== comment_id})});
  }

  updateComment = (comment_id, update_comment) => {
    this.setState({comments: 
      this.state.comments.map(comment => {
        if(comment.id === comment_id){
          return {...comment, comment: update_comment};
        } 
        return comment;
      })
    });
  }


  render() {
    const {toggle_update_btn, toggle_comment_btn, validate_comment, validate_update, delete_message_modal, comments} = this.state;
    const {message, message_id, deleteMessage} = this.props;
    return (
      <li className="message_control">
          <div className={!toggle_update_btn? "message" : "hidden"}>
            <p className="message_text">{message}</p>
            <div className="actions_control">
              <button onClick={this.toggleCommentBtn} type="button" className={comments.length? "add_comment_active" : "add_comment_inactive"}>
                <span className="add_comment_btn_icon"></span>
                <span className="comment_counter">{comments.length}</span>
                Comment
              </button>
              <button onClick={this.toggleUpdateMessage} className="edit_btn" type="button">
                <img src={PencilWrite} alt="Edit Message Icon blue" />
                Edit
              </button>
              <button onClick={this.toggleDeleteMessage} className="delete_btn" type="button">
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
              <form onSubmit={this.addComments} className="comment_form" action="/" method="POST">
                <textarea onChange={this.onChange} name="comment_input" placeholder="Type your comment here." value={validate_comment}></textarea>
                <button type="submit" disabled={!validate_comment}>Post Comment</button>
              </form>
            </li>
            {
              comments.map(index =>{
                return (
                  <Comments 
                    key={index.id}
                    comment={index.comment}
                    comment_id={index.id}
                    deleteComment={this.deleteComment}
                    updateComment={this.updateComment}
                  />
                )
              }).reverse()
            }
          </ul>
        {
          delete_message_modal && (
            <DeleteMessage
              deleteMessage={deleteMessage}
              message_id={message_id}
              toggleDeleteMessage={this.toggleDeleteMessage}
            />
          )
        }
      </li>
    )
  }
}
