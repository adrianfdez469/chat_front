import React, {useRef, useEffect, useState} from 'react';
import Signin from "./signin.view";
const SigninController = props => {
    let idioma = 'en';
    var userLang = navigator.language || navigator.userLanguage;
    if(/^(es-).+/.test(userLang)){
        idioma = 'es';
    } 

    const emailRef = useRef('');
    const passRef = useRef('');
    const [remember, setRemember] = useState(false);

    useEffect(() => {
        if(localStorage.email && localStorage.password && localStorage.rememberme){
            emailRef.current.value = localStorage.email;
            passRef.current.value = localStorage.password;
            setRemember(true);
        }
    },[])

    const onSignIn = (event) => {
        event.preventDefault();
        
        if(remember === true){
            localStorage.setItem('email', emailRef.current.value);
            localStorage.setItem('password', passRef.current.value);
            localStorage.setItem('rememberme', true);
        }else{
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            localStorage.removeItem('rememberme');
        }
    }
    
    return <Signin idioma={idioma} 
        emailRef={emailRef}
        passRef={passRef}
        rememberChecked={remember}
        onRememberChange={event => setRemember(event.target.checked)}
        onSignIn={onSignIn}
    />;

}

export default SigninController;
