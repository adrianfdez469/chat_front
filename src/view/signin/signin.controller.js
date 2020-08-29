import React, {useRef, useEffect, useState} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {useSetRecoilState, useRecoilState} from 'recoil';
import {idiomaState, /*authTokenState,*/ userAvatarState, loginData, tokenTimeoutAtom} from '../../components/recoil/atoms';
import Signin from "./signin.view";
import {DEFAULT_CONFIG} from '../../conf/configuration';
import NotificationHook from '../../components/uiComponents/notification/notification.hook';
import text from './idioma.json';
import authMiddleware from '../../authMiddleware';

const SigninController = props => {

    const [idioma, setIdiomaState] = useRecoilState(idiomaState);
    //const setAuthTokenState = useSetRecoilState(authTokenState);
    const setUserAvatarState = useSetRecoilState(userAvatarState);
    const setTokenTimeOut = useSetRecoilState(tokenTimeoutAtom);
    const setLoginData = useSetRecoilState(loginData);
    const [redirectState, setRedirect] = useState(null);
    const {openErrorNotification} = NotificationHook();
    const emailRef = useRef('');
    
    const passRef = useRef('');
    const [remember, setRemember] = useState(false);
    const [forgotWinState, setforgotWinState] = useState(false);

    useEffect(() => {
        
        const optimisticAction = token => {
            axios.post(`${DEFAULT_CONFIG.server}/users/loginWithToken`,{
                token: token
            })
            .then(resp => {
                if(resp.status === 200){
                    const {
                        token, token_expires, _id, nickname, firstName,
                        lastName, email, gender, language, avatarUrl
                    } = resp.data;
    
                    
                    localStorage.setItem('token', token);
                    localStorage.setItem('token_expires', token_expires);
                    setTokenTimeOut({
                        timeleft: token_expires
                    });
    
                    setLoginData({
                        userId: _id, 
                        nickname: nickname,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        gender: gender
                    });
                    setIdiomaState(language);
                    if(avatarUrl)
                        setUserAvatarState(`${DEFAULT_CONFIG.server}${avatarUrl}`);

                    setRedirect(true);
                }
            })
            .catch(err => {
                console.log('Error al cargar los datos del usuario usando el token');
            })
        }
        
        authMiddleware(optimisticAction);



        if(localStorage.email && localStorage.password && localStorage.rememberme){
            emailRef.current.value = localStorage.email;
            passRef.current.value = localStorage.password;
            setRemember(true);
        }
    },[])

    const forgetPassHandler = () => {
        setforgotWinState(!forgotWinState);
    }

    

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

        axios.post(`${DEFAULT_CONFIG.server}/users/login`, {
            email: emailRef.current.value,
            password: passRef.current.value
        })
        .then(resp => {
            if(resp.status === 200){
                
                const {
                    token, token_expires, _id, nickname, firstName,
                    lastName, email, gender, language, avatarUrl,
                    refresh_token, refresh_token_expires
                } = resp.data;

                
                localStorage.setItem('token', token);
                localStorage.setItem('refresh_token', refresh_token);
                localStorage.setItem('token_expires', token_expires);
                localStorage.setItem('refresh_token_expires', refresh_token_expires);
                setTokenTimeOut({
                    timeleft: token_expires
                });

                setLoginData({
                    userId: _id, 
                    nickname: nickname,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    gender: gender
                });
                setIdiomaState(language);
                if(avatarUrl)
                    setUserAvatarState(`${DEFAULT_CONFIG.server}${avatarUrl}`);

                setRedirect(true);

            }
        })
        .catch(err => {
            if(err.response.status === 403){
                openErrorNotification(text.notAuthorized[idioma]);
            }else{
                openErrorNotification(text.internalError[idioma]);
            }
        });
    }

    if(redirectState){
        return <Redirect to="/contacts" />
    }
    
    return <Signin idioma={idioma} 
        emailRef={emailRef}
        passRef={passRef}
        rememberChecked={remember}
        onRememberChange={event => setRemember(event.target.checked)}
        onSignIn={onSignIn}
        forgotWinState={forgotWinState}
        forgetPassHandler={forgetPassHandler}
    />;

}

export default SigninController;
