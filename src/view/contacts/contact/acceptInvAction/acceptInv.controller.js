import React from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import axios from 'axios';
import {idiomaState, loginData/*, updateFriendSelector*/} from '../../../../components/recoil/atoms';
import {friendSelector} from '../../../../components/recoil/selectors';
import { DEFAULT_CONFIG } from '../../../../conf/configuration';
import useNotificationHook from '../../../../components/uiComponents/notification/notification.hook';
import authMiddleware from '../../../../authMiddleware';
import AcceptInvActionView from './acceptinv.view';
import text from './idioma.json';
import socketClient from '../../../../utils/socket';

const AcceptInvActionController = ({preAction, contact}) => {

    const idioma = useRecoilValue(idiomaState);
    const userData = useRecoilValue(loginData);
    const {openErrorNotification} = useNotificationHook();
    //const switchContact = useSetRecoilState(updateFriendSelector);
    const friendDispatcher = useSetRecoilState(friendSelector);

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
                if(resp.status === 200){
                    //switchContact(resp.data.friend);
                    friendDispatcher({action: 'update', payload: {friend: {...resp.data.friend, socketId: contact.socketId}}});
                    const client = socketClient.getSocket();
                    
                    client.emit('accept friendship', {
                        accepterId: userData.userId,
                        socketIdRequester: contact.socketId,
                        token: token
                    });
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