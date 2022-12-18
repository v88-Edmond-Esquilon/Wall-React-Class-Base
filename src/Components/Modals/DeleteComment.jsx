import React, { Component } from 'react';
import CloseButtonImg from '../../assets/images/icons/cancel.png';
import './modals.scss';

export default class DeleteComment extends Component {
  onClose = () => {
    this.props.toggleDeleteComment();
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.deleteComment(this.props.comment_id);
    this.onClose();
  }

  render() {
    return (
      <div className="modal">
        <form onSubmit={this.onSubmit} id="delete_comment_form" action="/" method="POST">
          <button onClick={this.onClose} className="close_modal_btn" type="button" title="Close Modal">
            <img src={CloseButtonImg} alt="Close button for this modal" />
          </button>
          <h3>Confirm Delete Comment</h3>
          <p>Are you sure you want to remove this Comment? <br/>This action cannot be undone.</p>
          <button type="button" className="action_btn cancel_btn" onClick={this.onClose}>Cancel</button>
          <button type="submit" className="modal_delete_btn">Yes, Remove it.</button>
        </form>
      </div>
    )
  }
}
