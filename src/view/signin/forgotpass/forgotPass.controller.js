import React, {useState} from 'react';
import {useRecoilState} from 'recoil';
import NotificationHook from '../../../components/uiComponents/notification/notification.hook';
import text from './idioma.json';
import ForgotPassView from './forgotPass.view';
import axios from 'axios';
import {DEFAULT_CONFIG} from '../../../conf/configuration';


const ForgotPassController = ({idioma, forgotWinState, forgetPassHandler}) => {

    const [forgotEmailState, setForgotEmailStste] = useState({value:'', valid:true});
    const {openSuccessNotification, openErrorNotification} = NotificationHook();

    const onChangeForgotEmail = ({target: {value}}) => {
        setForgotEmailStste({...forgotEmailState, valid: true, value: value});
    }

    const forgotWinOk = () => {        
        if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(forgotEmailState.value)){
            setForgotEmailStste({...forgotEmailState, valid: false});
        }else{
            axios.post(`${DEFAULT_CONFIG.server}/users/forgot`, {
                email: forgotEmailState.value,
                hostname: window.location.host
            })
            .then(resp => {
                if(resp.status === 201){
                    // Send a notification
                    openSuccessNotification(text.emailSended[idioma]);
                }
                forgetPassHandler();

            })
            .catch(err => {
                console.log(err);
                if(err.response.status === 404){
                    openErrorNotification(text.emailNotFound[idioma]);
                }else{
                    openErrorNotification(text.error[idioma]);
                }
            });







        }
    }

    return <ForgotPassView 
        idioma={idioma}
        forgotWinState={forgotWinState}
        onChangeForgotEmail={onChangeForgotEmail}
        forgotWinOk={forgotWinOk}
        forgotEmailState={forgotEmailState}
        setForgotEmailStste={setForgotEmailStste}
        forgetPassHandler={forgetPassHandler}
    />;

}
export default ForgotPassController;