

export const inputChange = (component, event, state) => {
   component.setState({[state]: event.target.value});
}

export const generateId = () => {
    return  Math.floor(Math.random() * 0xffffff).toString(16);
}

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

export const toggleUpdate = (component, props_value) => {
    if(component.state.toggle_update_btn){
        component.setState({toggle_update_btn: false});
    }
    else{
        component.setState({toggle_update_btn: true, validate_update: component.props[props_value]});
    }
}