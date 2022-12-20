
/**
 * DOCU: Pass the values to the state of the component use for validation of inputs. <br/>
 * Triggered: When the user inputs and changes the value of it in the text fields. <br/>
 * Last date updated: December 19, 2022
 * @function
 * @memberOf CreateMessage.jsx, SignUp.jsx, SignIn.jsx, Comments.jsx and Message.jsx
 * @param {component class} component - pass the component instance
 * @param {object} event - passes the event object to identify the target.value
 * @param {string} state - get the name of the state of the component
 * @author Edmond
 */
export const inputChange = (component, event, state) => {
   component.setState({[state]: event.target.value});
}

/**
 * DOCU: Generating a random hex code, return it as a string used by adding messages and comments <br/>
 * Triggered: when the user adds a new message and comment <br/>
 * Last date updated: December 19, 2022
 * @function
 * @memberOf Wall.jsx
 * @returns a random hex code
 * @author Edmond
 */
export const generateId = () => {
    return  Math.floor(Math.random() * 0xffffff).toString(16);
}

/**
 * DOCU: toggle the visibility of modal components <br/>
 * Triggered: when the user clicks the buttons of create message, delete message and delete comment <br/>
 * Last date updated: December 19, 2022
 * @function
 * @memberOf Wall.jsx
 * @param {component class} component - pass the component instance
 * @param {string} modal_type - string that identifies the modal state name
 */
export const toggleModal = (component, modal_type) => {
    if(component.state[modal_type]){
        component.setState({[modal_type] : false});
        document.querySelector('body').classList.remove('no_scroll');
    }
    else{
        component.setState({[modal_type] : true});
        document.querySelector('body').classList.add('no_scroll');
    }
}

/**
 * DOCU: For toggling the component visibility it is used for the update button. <br/>
 * Triggered: when the user clicks the button to update the Messages and Comments. <br/>
 * Last date updated: December 19, 2022
 * @function
 * @memberOf Message.jsx and Comment.jsx 
 * @param {component class} component - get the component instance
 * @param {string} props_value - string value of the props that has been passed from the parent component
 * @author Edmond
 */
export const toggleUpdate = (component, props_value) => {
    if(component.state.toggle_update_btn){
        component.setState({toggle_update_btn: false});
    }
    else{
        component.setState({toggle_update_btn: true, validate_update: component.props[props_value]});
    }
}