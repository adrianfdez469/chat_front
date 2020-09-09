import React, {useState} from 'react';
import {useRecoilValue} from 'recoil';
import NotificationHook from '../../components/uiComponents/notification/notification.hook';
import axios from 'axios';
import {withRouter, Redirect} from 'react-router-dom';

import ChangePassView from './changepass.view';
import {idiomaState} from './../../components/recoil/atoms';
import {DEFAULT_CONFIG} from '../../conf/configuration';
import text from './idioma.json';

const ChangePassController = props => {
    
    const idioma = useRecoilValue(idiomaState);

    const {openErrorNotification, openSuccessNotification} = NotificationHook();
    const [passState, setPassState] = useState({value: "", valid: true});
    const [pass2State, setPass2State] = useState({value: "", valid: true});
    const [redirect, setRedirect] = useState(false);


    const onPassChange = ({target: {value}}) => {
        setPassState({...passState, value: value, valid: true});
        setPass2State({...pass2State, valid: true});
    }
    const onPass2Change = ({target: {value}}) => {
        setPass2State({...pass2State, value: value, valid: true});
    }

    const submitPass = (event) => {
        event.preventDefault();
        if(passState.value.length < 8){
            setPassState({...passState, valid: false});
        }else if(pass2State.value !== passState.value){
            setPass2State({...pass2State, valid: false});
        }else {
            const token = props.match.params.token;
            
            axios.post(`${DEFAULT_CONFIG.server}/users/resetpassword`,{
                token: token,
                password: passState.value
            })
            .then(resp => {
                if(resp.status === 200){
                    openSuccessNotification(text.passChangeOk[idioma]);
                    setRedirect(true);
                }
            })
            .catch(err => {
                if(!err.response){
                    openErrorNotification(text.connError[idioma]);
                }else{
                    openErrorNotification(text.passChangeError[idioma]);
                }
            });
        }
    }

    if(redirect){
        return <Redirect to="/chat_front" />;
    }
    return <ChangePassView idioma={idioma} 
            passState={passState}
            pass2State={pass2State}

            onPassChange={onPassChange}
            onPass2Change={onPass2Change}
            submitPass={submitPass}
            />;

}

export default withRouter(ChangePassController);
