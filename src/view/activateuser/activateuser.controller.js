import React, {useState, useRef} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import axios from 'axios';
import {DEFAULT_CONFIG} from '../../conf/configuration';
import {useRecoilState} from 'recoil';
import {idiomaState} from '../../components/recoil/atoms';

import ActivateUserView from './activateuser.view';

const ActivateUserController = props => {

    const [idioma, setIdioma] = useRecoilState(idiomaState);

    const [activeStep, setActiveStep] = useState(0);
    const [activationError, setActivationError] = useState(false);
    const [redirectState, setRedirect] = useState(null);
    const [sexState, setSexState] = useState(null);
    const [nicknameState, setNickname] = useState(props.match.params.nickname);
    const [previewAvatar, setPreviewAvatar] = useState(null);
    const avatarRef = useRef(null);

    const handleLanguageChange = ({target: {value}}) => {
        setIdioma(value);
    }

    const handleFinish = () => {
        setRedirect(true);
    };
    const goNextConf = () => {
        setActiveStep(state => state+1);
    }
    const goBackConf = () => {
        setActiveStep(state => state-1);
    }
    const sexSelectHandler = ({target: {value}}) => {
        setSexState(value);
    }
    const setNicknameHandler = ({target: {value}}) => {
        setNickname(value);
    }


    const sendActivation = () => {
        
        goNextConf();

        axios.post(`${DEFAULT_CONFIG.server}/users/activate`, 
            {
                token: props.match.params.token,
                language: idioma,
                gender: sexState,
                nickname: nicknameState,
                avatar: previewAvatar
            })
        .then(resp => {
            if(resp.status === 200){
                goNextConf();
            }
            
        })
        .catch(err => {
            setActivationError(true);
        });
    }

    if(redirectState){
        return <Redirect to='/' />
    }

    return <ActivateUserView 
        idioma={idioma}
        activeStep={activeStep}
        handleFinish={handleFinish}
        handleLanguageChange={handleLanguageChange}
        sexSelectHandler={sexSelectHandler}
        sexState={sexState}
        nicknameState={nicknameState}
        setNicknameHandler={setNicknameHandler}
        preview={previewAvatar}
        setPreview={setPreviewAvatar}
        
        goNextConf={goNextConf}
        goBackConf={goBackConf}

        sendActivation={sendActivation}
        activationError={activationError}
        avatarRef={avatarRef}

    />;

}
export default withRouter(ActivateUserController);