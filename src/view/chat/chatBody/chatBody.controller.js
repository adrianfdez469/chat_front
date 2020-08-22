import React, { useEffect } from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import { friendSelector, initConversationSelector } from '../../../components/recoil/selectors'; 
import {userAvatarState, activeChatWith, idiomaState, loginData, getConversationWithContact} from '../../../components/recoil/atoms';
import ChatBodyView from './chatBody.view';
import useAxiosHook from '../../../utils/axiosHook';
import text from './idioma.json';
import socketClient from '../../../utils/socket';

const ChatBodyController = () => {
    
    const idContact = useRecoilValue(activeChatWith);
    const initConversation = useSetRecoilState(initConversationSelector);
    const messages = useRecoilValue(getConversationWithContact(idContact));
    const avatarSrc = useRecoilValue(userAvatarState);
    const userDate = useRecoilValue(loginData);
    const idioma = useRecoilValue(idiomaState);
    
    const friends = useRecoilValue(friendSelector);
    const {postRequest} = useAxiosHook();
    const contact = friends.find(f => f.contactId === idContact);


    const loadConversation = () => {
        postRequest({
            url: '/messages/getMessagesByContact',
            messageOnError: text.errorLoadConversation[idioma],
            bodyParams: {contactId: contact.contactId},
            doFnAfterSuccess: (resp, token) => {
                if(resp.status === 200){
                    
                    initConversation({
                        contactId: contact.contactId,
                        conversation: resp.data.conversation
                    });


                    const client = socketClient.getSocket();
                    client.emit('read messages', {
                        readerId: userDate.userId,
                        messengerId: contact.contactId,
                        messengerSocketId: contact.socketId,
                        token: token
                    });
                }
            },
            //doFnAfterError: err => console.log(err)
        });
    }

    useEffect(() => {
        loadConversation();
    }, []);

    if(messages ){
        return <ChatBodyView 
                    contact={contact}
                    avatarSrc={avatarSrc}
                    messages={messages}
                    idioma={idioma}
                /> ;
    }else{
        return null;
    }
}

export default ChatBodyController;