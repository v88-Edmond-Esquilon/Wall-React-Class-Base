import React, { Component } from 'react';
import { DeleteComment } from '../../Components';
import AvatarImg from '../../assets/images/icons/avatar.png';
import PencilWrite from '../../assets/images/icons/pencil-write.png';
import DeleteImg from '../../assets/images/icons/delete.png';
import './comments.scss';

export default class Comments extends Component {
  state = {
    update_comment_btn: false,
    validate_update: this.props.comment
  }
  /** Displays delete comment modal*/
  onClick = () => {
    this.props.toggleModal('delete_comment_modal');
  }
  /** Toggle between update comment or not*/
  toggleUpdateComment = () => {
    if(this.state.update_comment_btn){
      this.setState({update_comment_btn: false});
    }
    else{
      this.setState({update_comment_btn: true, validation_update: this.props.comment});
    }
  }

  onChange = (event) => {
    this.setState({validate_update: event.target.value});
  }

  render() {
    const {update_comment_btn, validate_update}= this.state;
    const {delete_comment_modal, toggleModal} = this.props;
    return (
      <li className="comment_control ">
        {
          !update_comment_btn? (
            <div className="comment">
              <p className="comment_text">The lorem ipsum is a placeholder text used in publishing and graphic design. This filler text is a short paragraph that contains all the letters of the alphabet. </p>
              <div className="actions_control">
                  <button onClick={this.toggleUpdateComment} className="edit_btn" type="button">
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
          ):
          (
            <form onSubmit={()=>{}} className="update_comment_form" action="/" method="POST">
              <textarea onChange={this.onChange} name="update_comment_input"></textarea>
              <button onClick={this.toggleUpdateComment} type="button" className="cancel_btn">Cancel</button>
              <button type="submit" disabled={!validate_update}>Update Comment</button>
            </form>
          )
        }
        {
          delete_comment_modal && (
            <DeleteComment
              toggleModal={toggleModal}
            />
          )
        }
      </li>
    )
  }
}
