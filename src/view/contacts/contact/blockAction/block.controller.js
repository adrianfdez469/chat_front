import React from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {idiomaState, loginData/*, deleteFriendSelector*/} from '../../../../components/recoil/atoms';
import {friendSelector} from '../../../../components/recoil/selectors';
import useAxiosHook from '../../../../utils/axiosHook';
import BlockActionView from './block.view';
import text from './idioma.json';
import socketClient from '../../../../utils/socket';

const BlockActionController = ({preAction, contact}) => {

    const idioma = useRecoilValue(idiomaState);
    const userData = useRecoilValue(loginData);
    const {postRequest} = useAxiosHook();
    //const deleteContact = useSetRecoilState(deleteFriendSelector);
    const friendDispatcher = useSetRecoilState(friendSelector);

    const onClick = () => {
        preAction();
        
        postRequest({
            url: '/users/blockUser',
            bodyParams: {blokedUserId: contact.contactId},
            messageOnError: text.onBlockError[idioma],
            doFnAfterSuccess: (resp, token) => {
                if(resp.status === 200){
                    //deleteContact(contact.contactId);
                    friendDispatcher({action: 'delete', payload: {friendId: contact.contactId}});
                    const client = socketClient.getSocket();
                    client.emit('block contact', {
                        blokerId: userData.userId, 
                        socketIdBloked: contact.socketId,
                        token: token
                    });
                }
            }
        });
    }

    return <BlockActionView 
        idioma={idioma}
        onClick={onClick}
    />;

}
export default BlockActionController;