import React from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {idiomaState, loginData/*, updateFriendSelector*/} from '../../../../components/recoil/atoms';
import {friendSelector} from '../../../../components/recoil/selectors';


import AcceptInvActionView from './acceptinv.view';
import text from './idioma.json';
import socketClient from '../../../../utils/socket';
import useAxiosHook from '../../../../utils/axiosHook';

const AcceptInvActionController = ({preAction, contact}) => {

    const idioma = useRecoilValue(idiomaState);
    const userData = useRecoilValue(loginData);
    const {postRequest} = useAxiosHook();
    //const switchContact = useSetRecoilState(updateFriendSelector);
    const friendDispatcher = useSetRecoilState(friendSelector);

    const onClick = () => {
        preAction();

        postRequest({
            url: '/users/acceptFriendRequest',
            bodyParams: {
                acceptedUserId: contact.contactId
            },
            doFnAfterSuccess: (resp, token) => {
                friendDispatcher({action: 'update', payload: {friend: {...resp.data.friend, socketId: contact.socketId}}});
                const client = socketClient.getSocket();
                
                client.emit('accept friendship', {
                    accepterId: userData.userId,
                    socketIdRequester: contact.socketId,
                    token: token
                });
            },
            messageOnError: text.errorAccepting[idioma]
        });
        
    }

    return <AcceptInvActionView 
        idioma={idioma}
        onClick={onClick}
    />;

}
export default AcceptInvActionController;