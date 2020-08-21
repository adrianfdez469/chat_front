import React from 'react';
import {useRecoilValue} from 'recoil';
import { friendSelector } from '../../../components/recoil/selectors'; 
import { activeChatWith } from '../../../components/recoil/atoms'; 
import ChatHeaderView from './chatHeader.view';

const ChatHeaderController = ({closeChat}) => {

    const idContact = useRecoilValue(activeChatWith);
    const friends = useRecoilValue(friendSelector);
    const contact = friends.find(f => f.contactId === idContact);
    
    return <ChatHeaderView 
        closeChat={closeChat}
        contact={contact}
    />;

}
export default ChatHeaderController;