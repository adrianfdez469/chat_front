import React, {useState, useRef} from 'react';
import {useRecoilValue} from 'recoil';
import {idiomaState} from '../../components/recoil/atoms';
import Signup from './signup.view';

const SignupController = props => {
    const idioma = useRecoilValue(idiomaState);
    const [emailState, setEmailState] = useState({value: "", valid: true});
    const [passState, setPassState] = useState({value: "", valid: true});    
    
    const nameRef = useRef();
    const lastNameRef = useRef();

    const onSignUp = (event) => {
        event.preventDefault();
        if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailState.value)){
            setEmailState({...emailState, valid: false});
        }
        if(passState.value.length < 8){
            setPassState({...passState, valid: false, msg: 'passShort'})
        }
        
        
        
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
           
            nameRef={nameRef}
            lastNameRef={lastNameRef}
            passState={passState}
            emailState={emailState}
            onSignUp={onSignUp}

            onEmailChange={onEmailChange}
            onPassChange={onPassChange}
        />
    );

}
export default SignupController;