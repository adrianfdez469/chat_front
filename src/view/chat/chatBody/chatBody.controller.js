import React, { useEffect } from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import { friendSelector, initConversationSelector } from '../../../components/recoil/selectors'; 
import {userAvatarState, activeChatWith, idiomaState, getConversationWithContact} from '../../../components/recoil/atoms';
import ChatBodyView from './chatBody.view';
import useAxiosHook from '../../../utils/axiosHook';
import text from './idioma.json';
import useEvents from '../../../components/events';

const ChatBodyController = () => {
    
    const idContact = useRecoilValue(activeChatWith);
    const initConversation = useSetRecoilState(initConversationSelector);
    const messages = useRecoilValue(getConversationWithContact(idContact));
    const avatarSrc = useRecoilValue(userAvatarState);
    
    const idioma = useRecoilValue(idiomaState);
    const {subscribeAll, unSubscribeAll} = useEvents();
    
    const friends = useRecoilValue(friendSelector);
    const {postRequest} = useAxiosHook();
    const contact = friends.find(f => f.contactId === idContact);

    useEffect(() => {
        unSubscribeAll();
        subscribeAll();
    }, [])

    const loadConversation = () => {
        if(messages.length === 0){
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
                    }
                }
            });
        }
    }

    useEffect(() => {
        loadConversation();
    }, []);



    if(messages){
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