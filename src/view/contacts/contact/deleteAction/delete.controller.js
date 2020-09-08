import React from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {idiomaState, loginData/*, deleteFriendSelector*/} from '../../../../components/recoil/atoms';
import {friendSelector} from '../../../../components/recoil/selectors';
import useAxiosHook from '../../../../utils/axiosHook';
import DeleteActionView from './delete.view';
import text from './idioma.json';
import socketClient from '../../../../utils/socket';

const DeleteActionController = ({preAction, contact}) => {

    const idioma = useRecoilValue(idiomaState);
    const userData = useRecoilValue(loginData);
    const {postRequest} = useAxiosHook();
    //const deleteFriend = useSetRecoilState(deleteFriendSelector);
    const friendDispatcher = useSetRecoilState(friendSelector);


    const onClick = () => {

        preAction();
        postRequest({
            url: '/users/deleteContact',
            bodyParams: {deletedUserId: contact.contactId},
            messageOnError: text.onDeleteError[idioma],
            doFnAfterSuccess: (resp, token) => {
                if(resp.status === 200){
                    friendDispatcher({action: 'delete', payload: {friendId: contact.contactId}});

                    if(contact.friendShipStatus === 1){
                        const client = socketClient.getSocket();
                        client.emit('delete contact', {
                            deleterId: userData.userId,
                            socketIdDeleted: contact.socketId,
                            token: token
                        });
                    }
                }
            }
        });
    }

    return <DeleteActionView 
        idioma={idioma}
        text={text}
        onClick={onClick}
    />;

}
export default DeleteActionController;