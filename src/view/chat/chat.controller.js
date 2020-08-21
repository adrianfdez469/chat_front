import React from 'react';
import ChatView from './chat.view';
import {withRouter, Redirect, Route} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import {friendSelector} from '../../components/recoil/selectors';
import {activeChatWith} from '../../components/recoil/atoms';

const ChatController = props => {

    const setContact = useSetRecoilState(activeChatWith);

    const closeChat = () => {
        setContact(null);
    }

    return <ChatView 
        closeChat={closeChat}
    />;

}
export default withRouter(ChatController);