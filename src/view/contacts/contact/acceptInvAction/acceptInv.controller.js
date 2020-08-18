import React from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import axios from 'axios';
import {idiomaState, updateFriendSelector} from '../../../../components/recoil/atoms';
import { DEFAULT_CONFIG } from '../../../../conf/configuration';
import useNotificationHook from '../../../../components/uiComponents/notification/notification.hook';
import authMiddleware from '../../../../authMiddleware';
import AcceptInvActionView from './acceptinv.view';
import text from './idioma.json';

const AcceptInvActionController = ({preAction, contact}) => {

    const idioma = useRecoilValue(idiomaState);
    const {openErrorNotification} = useNotificationHook();
    const switchContact = useSetRecoilState(updateFriendSelector);

    const onClick = () => {
        preAction();
        const optimisticAction = token => {
            axios.post(`${DEFAULT_CONFIG.server}/users/acceptFriendRequest`, {
                acceptedUserId: contact.contactId
            }, {
                headers: {
                    "Authorization": token
                }
            })
            .then(resp => {
                console.log(resp.data.friend);
                if(resp.status === 200){
                    switchContact(resp.data.friend);
                }
            })
            .catch(err => {
                openErrorNotification(text.errorAccepting[idioma]);
            });
        }

        authMiddleware(optimisticAction);
        
    }

    return <AcceptInvActionView 
        idioma={idioma}
        onClick={onClick}
    />;

}
export default AcceptInvActionController;