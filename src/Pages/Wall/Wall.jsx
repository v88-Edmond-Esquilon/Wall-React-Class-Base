import React, { Component } from 'react';
import {CreateMessage, Messages} from '../../Components';
import {Link} from 'react-router-dom';
import NoMessageImg from '../../assets/images/landing_page.png';
import './wall.scss';

export default class Wall extends Component {
  state = {
    create_message: false,
    delete_message_modal: false,
    delete_comment_modal: false,
    messages: []
  }

  /** Displays Modal */
  toggleModal = (modal_type) => {
    if(this.state[modal_type]){
      this.setState({[modal_type] : false});
      document.querySelector('body').classList.remove('no_scroll');
    }
    else{
      this.setState({[modal_type] : true});
      document.querySelector('body').classList.add('no_scroll');
    }
  }
  /** Display Create Message Modal*/
  onClick = () =>{
    this.toggleModal('create_message');
  }

  addMessage = (message) => {
    const generate_id = Math.floor(Math.random() * 0xffffff).toString(16);
    this.setState({messages: [...this.state.messages, {id: generate_id, message: message}]});
  }

  deleteMessage = (message_id) =>{
    console.log(message_id)
    this.setState({messages: this.state.messages.filter(message => {return message.id !== message_id})});
  }

  updateMessage = (message_id, update_message) => {
    this.setState({messages: 
      this.state.messages.map(message => {
        if(message.id === message_id){
          return {...message, message: update_message};
        } 
        return message;
      })
    });
  }

  render() {
    const {create_message, delete_message_modal, delete_comment_modal, messages} = this.state;
    return (
      <div id="wall_wrapper">
        <nav>
          <h2><Link to="/">The Wall Assignment</Link></h2>
          <p>Welcome, Edmond Esquilon <Link to="/">Log out</Link></p>
        </nav>
        <div id="container">
          <main>
            <header>
              <p><span id="message_counter">{messages.length}</span> messages arranged by latest posted</p>
              <button onClick={this.onClick} id="create_message_btn" type="button">Create Message</button>
            </header>
            <div id="no_message_inbox" className={messages.length? "hidden" : ''}>
              <img src={NoMessageImg} alt="No message inbox color blue" />
              <p>No Posted Message Yet.</p>
            </div>
            <ul id="message_container">
              {
                messages.map(index => {
                  return (
                    <Messages
                      delete_comment_modal={delete_comment_modal}
                      delete_message_modal={delete_message_modal}
                      deleteMessage={this.deleteMessage}
                      key={index.id}
                      message_id={index.id}
                      message={index.message}
                      toggleModal={this.toggleModal}
                      updateMessage={this.updateMessage}
                    />
                  )
                }).reverse()
              }
            </ul>
          </main>
        </div>
        {
          create_message && ( 
            <CreateMessage
              toggleModal={this.toggleModal}
              addMessage={this.addMessage}
            />
          )
        }
      </div>
    )
  }
}
