import React, {useState, useRef} from 'react';
import axios from 'axios';
import {DEFAULT_CONFIG} from '../../conf/configuration';
import Signup from './signup.view';
import {useRecoilValue} from 'recoil';
import {idiomaState} from '../../components/recoil/atoms';
import NotificationHook from '../../components/uiComponents/notification/notification.hook';
import text from './idioma.json';

const SignupController = props => {
    
    const idioma = useRecoilValue(idiomaState);
    const {openSuccessNotification, openErrorNotification} = NotificationHook();
    const [emailState, setEmailState] = useState({value: "", valid: true});
    const [passState, setPassState] = useState({value: "", valid: true});    
    const [nameState, setNameState] = useState({value: "", valid: true});    
    
    const lastNameRef = useRef();

    const onSignUp = (event) => {
        event.preventDefault();
        if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailState.value)){
            setEmailState({...emailState, valid: false});
        }else
        if(passState.value.length < 8){
            setPassState({...passState, valid: false, msg: 'passShort'});
        }else

        if(!/^[a-zA-Z\']+$/.test(nameState.value)){
            setNameState({...nameState, valid: false, msg: 'nameInvalid'});
        }else
        if(nameState.value.length < 2){
            setNameState({...nameState, valid: false, msg: 'nameShort'});
        }else
        if(nameState.value.length >= 20){
            setNameState({...nameState, valid: false, msg: 'nameLong'});
        }else {
            // All validations pass!
            axios.post(`${DEFAULT_CONFIG.server}/users/signup`, {
                firstName: nameState.value,
                lastName: lastNameRef.current.value,
                email: emailState.value,
                password: passState.value,
                language: idioma,
                hostname: window.location.host
            })
            .then(resp => {
                if(resp.status === 201){
                    // Send a notification
                    openSuccessNotification(text.userCreated[idioma]);
                }
            })
            .catch(err => {
                if(!err.response){
                    openErrorNotification(text.connError[idioma]);
                }else if(err.response.status === 409){
                    openErrorNotification(text.duplicated[idioma]);
                }else{
                    openErrorNotification(text.error[idioma]);
                }
            });
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