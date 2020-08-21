import React from 'react';
import {useRecoilValue} from 'recoil';
import { friendSelector } from '../../../components/recoil/selectors'; 
import {userAvatarState, activeChatWith} from '../../../components/recoil/atoms';
import ChatBodyView from './chatBody.view';


const ChatBodyController = () => {

    const avatarSrc = useRecoilValue(userAvatarState);
    const idContact = useRecoilValue(activeChatWith);
    const friends = useRecoilValue(friendSelector);
    const contact = friends.find(f => f.contactId === idContact);

    return <ChatBodyView contact={contact} avatarSrc={avatarSrc}/>;
}

export default ChatBodyController;