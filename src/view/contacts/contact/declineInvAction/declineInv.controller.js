import React from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import axios from 'axios';
import {idiomaState, deleteFriendSelector} from '../../../../components/recoil/atoms';
import authMiddleware from '../../../../authMiddleware';
import useNotificationHook from '../../../../components/uiComponents/notification/notification.hook';
import {DEFAULT_CONFIG} from '../../../../conf/configuration';

import text from './idioma.json'

import DeclineInvActionView from './declineinv.view';


const DeclineInvActionController = ({preAction, contact}) => {

    const idioma = useRecoilValue(idiomaState);
    const {openErrorNotification} = useNotificationHook();
    const eliminarContacto = useSetRecoilState(deleteFriendSelector);

    const onClick = () => {
        preAction();
        const optimisticAction = token => {
            axios.post(`${DEFAULT_CONFIG.server}/users/declineFriendRequest`, {
                declinedUserId: contact.contactId
            }, {
                headers: {
                    'Authorization': token
                }
            })
            .then(resp => {
                if(resp.status === 200){
                    console.log(resp.data);
                    eliminarContacto(contact.contactId);
                }
            })
            .catch(err => {
                openErrorNotification(text.errorDeclining[idioma]);
            })
        }

        authMiddleware(optimisticAction);
        
    }

    return <DeclineInvActionView 
        idioma={idioma}
        onClick={onClick}
        text={text}
    />;

}
export default DeclineInvActionController;