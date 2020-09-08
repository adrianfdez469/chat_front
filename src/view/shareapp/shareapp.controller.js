import React, {useState} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import useAxiosHook from '../../utils/axiosHook';
import useNotification from '../../components/uiComponents/notification/notification.hook';
import {idiomaState} from '../../components/recoil/atoms';
import {friendSelector} from '../../components/recoil/selectors';
import ShareAppView from './shareapp.view';
import text from './idioma.json';

const ShareAppController = ({close}) => {

    const idioma = useRecoilValue(idiomaState);
    
    const {postRequest} = useAxiosHook();
    const {openErrorNotification} = useNotification();
    const friendDispatcher = useSetRecoilState(friendSelector);

    const [emailState, setEmailState] = useState({value: '', valid: true});
    const [nameState, setNameState] = useState({value: '', valid: true});  


    const onNameChange = ({target: {value}}) => {
        setNameState(oldState => ({...oldState, value: value, valid: true}));
    };
    const onEmailChange = ({target:{value}}) => {
        setEmailState(oldState => ({...oldState, value: value, valid: true}));
    }

    const onSend =(event) => {
        event.preventDefault();
        if(!/^[a-zA-Z\']+$/.test(nameState.value)){
            setNameState({...nameState, valid: false, msg: 'nameInvalid'});
        }else
        if(nameState.value.length < 2){
            setNameState({...nameState, valid: false, msg: 'nameShort'});
        }else
        if(nameState.value.length >= 20){
            setNameState({...nameState, valid: false, msg: 'nameLong'});
        }else
        if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailState.value)){
            setEmailState({...emailState, valid: false});
        }else
        {
            postRequest({
                url: '/users/shareapp',
                bodyParams: {
                    firstName: nameState.value,
                    email: emailState.value,
                    language: idioma,
                    hostname: window.location.host
                },
                messageOnSuccess: text.sendSuccess[idioma],
                doFnAfterError: err => {                    
                    if(!err.response){
                        openErrorNotification(text.connError[idioma]);
                    }
                    else if(err.response.status === 409){
                        openErrorNotification(text.emailExist[idioma]);
                    }
                },
                doFnAfterSuccess: resp => {
                    if(resp.status === 201){
                        const newFriend = resp.data.friend;
                        friendDispatcher({action: 'add', payload: {friend: newFriend}});
                    }
                    close();
                }
            });
        }
    }



    return <ShareAppView 
        text={text}
        idioma={idioma}

        nameState={nameState}
        onNameChange={onNameChange}
        emailState={emailState}
        onEmailChange={onEmailChange}

        onSend={onSend}
    />;

}
export default ShareAppController;