import React from 'react';
import {useRecoilValue, useRecoilState} from 'recoil';
import { friendSelector } from '../../../components/recoil/selectors'; 
import { activeChatWith } from '../../../components/recoil/atoms'; 
import ChatHeaderView from './chatHeader.view';

const ChatHeaderController = () => {

    const [idContact, setActiveChatWith] = useRecoilState(activeChatWith);
    const friends = useRecoilValue(friendSelector);
    const contact = friends.find(f => f.contactId === idContact);

    const closeChat = () => {
        console.log('close chat');
        
        setActiveChatWith(null);
    }
    
    return <ChatHeaderView 
        closeChat={closeChat}
        contact={contact}
    />;

}
export default ChatHeaderController;