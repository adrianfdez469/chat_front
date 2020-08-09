import React, {useState, useRef} from 'react';
import Signup from './signup.view';

const SignupController = props => {
    let idioma = 'en';
    let userLang = navigator.language || navigator.userLanguage;
    if(/^(es-).+/.test(userLang)){
        idioma = 'es';
    } 
    
    const [emailState, setEmailState] = useState({value: "", valid: true});
    const [passState, setPassState] = useState({value: "", valid: true});    
    const [nameState, setNameState] = useState({value: "", valid: true});    
    
    const lastNameRef = useRef();

    const onSignUp = (event) => {
        event.preventDefault();
        if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailState.value)){
            setEmailState({...emailState, valid: false});
        }
        if(passState.value.length < 8){
            setPassState({...passState, valid: false, msg: 'passShort'});
        }

        if(!/^[a-z\']+$/.test(nameState.value)){
            setNameState({...nameState, valid: false, msg: 'nameInvalid'});
        }
        if(nameState.value.length < 2){
            setNameState({...nameState, valid: false, msg: 'nameShort'});
        }
        if(nameState.value.length > 20){
            setNameState({...nameState, valid: false, msg: 'nameLong'});
        }
    }

    const onNameChange = ({target: {value}}) => {
        setNameState({...nameState, value: value, valid: true});
    }
    const onEmailChange = ({target:{value}}) => {
        setEmailState({...emailState, value: value, valid: true});
    }
    const onPassChange = ({target: {value}}) => {
        setPassState({...passState, value: value, valid: true});
    }

//^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$
    return (
        <Signup 
            idioma={idioma}
           
            
            lastNameRef={lastNameRef}
            nameState={nameState}
            passState={passState}
            emailState={emailState}
            onSignUp={onSignUp}
            onNameChange={onNameChange}
            onEmailChange={onEmailChange}
            onPassChange={onPassChange}
        />
    );

}
export default SignupController;