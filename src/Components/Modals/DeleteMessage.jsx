import React, { Component } from 'react';
import CloseButtonImg from '../../assets/images/icons/cancel.png';
import './modals.scss';

export default class DeleteMessage extends Component {

  onClose = () => {
    this.props.toggleModal('delete_message_modal');
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.deleteMessage(this.props.message_id);
    this.onClose();
  }

  render() {
    return (
      <div className="modal">
      <form onSubmit={this.onSubmit} id="delete_message_form" action="/" method="POST">
        <button onClick={this.onClose} className="close_modal_btn" type="button" title="Close Modal">
          <img src={CloseButtonImg} alt="Close button for this modal" />
        </button>
        <h3>Confirm Delete Message</h3>
        <p>Are you sure you want to remove this Message? <br/>This action cannot be undone.</p>
        <button type="button" className="action_btn cancel_btn" onClick={this.onClose}>Cancel</button>
        <button type="submit" className="modal_delete_btn">Yes, Remove it.</button>
      </form>
    </div>
    )
  }
}
