import React from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {idiomaState, loginData/*, deleteFriendSelector*/} from '../../../../components/recoil/atoms';
import { friendSelector } from '../../../../components/recoil/selectors';
import socketClient from '../../../../utils/socket';
import useAxiosHook from '../../../../utils/axiosHook';
import text from './idioma.json'
import DeclineInvActionView from './declineinv.view';


const DeclineInvActionController = ({preAction, contact}) => {

    const idioma = useRecoilValue(idiomaState);
    //const eliminarContacto = useSetRecoilState(deleteFriendSelector);
    const friendDispatcher = useSetRecoilState(friendSelector);
    const userData = useRecoilValue(loginData);
    const {postRequest} = useAxiosHook();

    const onClick = () => {
        preAction();

        postRequest({
            url: '/users/declineFriendRequest',
            bodyParams: {
                declinedUserId: contact.contactId
            },
            doFnAfterSuccess: (resp, token) => {
                if(resp.status === 200){
                    friendDispatcher({action: 'delete', payload: {friendId: contact.contactId}});
                    const socket = socketClient.getSocket();
                    socket.emit('decline friendship', {
                        declinerId: userData.userId,
                        declinedId: contact.contactId,
                        socketIdDeclined: contact.socketId,
                        token: token
                    });
                }
            },
            messageOnError: text.errorDeclining[idioma]
        });
        
    }

    return <DeclineInvActionView 
        idioma={idioma}
        onClick={onClick}
        text={text}
    />;

}
export default DeclineInvActionController;